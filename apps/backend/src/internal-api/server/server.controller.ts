import { Body, Controller, Post, Get } from '@nestjs/common';
import { GenerateServerSchema } from './services/generate-server-schema.service';
import { GenerateServerSchemaDto } from './dto/generate-server-schema.dto';
import { DiscordChooseToken } from './services/discord-choose-token.service';

@Controller('/api/server')
export class ServerController {
  constructor(
    private generate: GenerateServerSchema,
    private discordChoose: DiscordChooseToken,
  ) {}

  @Post('/generate')
  async generateServer(@Body() data: GenerateServerSchemaDto) {
    return this.generate.generate(data);
  }

  @Get('/choose')
  async chooseToken() {
    return this.discordChoose.choose();
  }
}
