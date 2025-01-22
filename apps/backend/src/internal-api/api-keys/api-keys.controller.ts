import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CreateApiKeysService } from './services/create.service';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import { UpdateService } from './services/update.service';

@Controller('/api/internal')
export class ApiKeysController {
  constructor(
    private service: CreateApiKeysService,
    private serviceUpdate: UpdateService,
  ) {}

  @Post('create')
  createApi(@Body() createApiBody: CreateApiDto): Promise<string> {
    return this.service.createApi(createApiBody);
  }

  @Post('update')
  @HttpCode(200)
  updateApi(@Body() updateApiBody: UpdateApiDto): Promise<string> {
    return this.serviceUpdate.updateApi(updateApiBody);
  }
}
