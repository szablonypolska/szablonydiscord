import { Test } from '@nestjs/testing';
import { ModulePayments } from '../payments.module';
import { TestingModule } from '@nestjs/testing/testing-module';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

describe('CreatePaymentsE2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), ModulePayments],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('api/payments/create (POST) - cant create without body', () => {
    return request(app.getHttpServer())
      .post('/api/payments/create')
      .send({})
      .expect(400);
  });

  it('api/payments/create (POST) - cant create with invalid body item', () => {
    return request(app.getHttpServer())
      .post('/api/payments/create')
      .send({ item: ['test'], userId: '541526393641500675', promoCode: '' })
      .expect(400);
  });

  it('api/payments/create (POST) - cant create with invalid userId', () => {
    return request(app.getHttpServer())
      .post('/api/payments/create')
      .send({ item: ['basic'], userId: '534534', promoCode: '' })
      .expect(400);
  });

  it('api/payments/create (POST) - create payment', () => {
    return request(app.getHttpServer())
      .post('/api/payments/create')
      .send({ item: ['basic'], userId: '541526393641500675', promoCode: '' })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
