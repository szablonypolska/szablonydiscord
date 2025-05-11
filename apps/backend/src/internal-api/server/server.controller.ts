import { Body, Controller, Post } from '@nestjs/common';
import { GenerateServerSchema } from './services/generate-server-schema.service';
import { GenerateServerSchemaDto } from './dto/generate-server-schema.dto';

@Controller('/api/server')
export class ServerController {
  constructor(private generate: GenerateServerSchema) {}

  @Post('/generate')
  async generateServer(@Body() data: GenerateServerSchemaDto) {
    return this.generate.generate(data);
  }
}
