import { Body, Controller, Post } from '@nestjs/common';
import { GenerateServerSchema } from './services/generate-server-schema.service';
import { GenerateServerSchemaDto } from './dto/generate-server-schema.dto';
import { PublishTemplate } from './services/publish.service';
import { PublishDto } from './dto/publish.dto';

@Controller('/api/server')
export class ServerController {
  constructor(
    private generate: GenerateServerSchema,
    private publish: PublishTemplate,
  ) {}

  @Post('/generate')
  async generateServer(@Body() data: GenerateServerSchemaDto) {
    return this.generate.generate(data);
  }

  @Post('/publish')
  async publishTemplate(@Body() data: PublishDto) {
    return this.publish.publishTemplate(data);
  }
}
