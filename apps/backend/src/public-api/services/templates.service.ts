import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplatesService {
  getHello(): string {
    console.log('siema');
    return 'siema';
  }
}
