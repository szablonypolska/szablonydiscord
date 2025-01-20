import { Controller, Post, Body } from '@nestjs/common';
import { CreateApiKeysService } from './services/create.service';
import { CreateApiDto } from './dto/create-api.dto';

@Controller('/api/internal')
export class ApiKeysController {
  constructor(private readonly service: CreateApiKeysService) {}

  @Post('create')
  createApi(@Body() createApiBody: CreateApiDto): Promise<string> {
    return this.service.createApi(createApiBody);
  }
}
