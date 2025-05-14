import { Module } from '@nestjs/common';
import { ServerController } from './server.controller';
import { GenerateServerSchema } from './services/generate-server-schema.service';
import { WebsocketModule } from 'src/websocket/websocket.module';
import { SharedModule } from '@repo/shared';
import { DiscordCreateCategoryService } from './services/discord-category.service';
import { DiscordCreateChannelService } from './services/discord-channel.service';
import { DiscordCreateRolesService } from './services/discord-roles.service';
import { DiscordGuildService } from './services/discord-guild.service';
import { DiscordAiGeneratorService } from './services/discord-ai-generator.service';
import { DiscordServerCreatorService } from './services/discord-server-creator.service';

@Module({
  imports: [WebsocketModule, SharedModule],
  providers: [
    GenerateServerSchema,
    DiscordCreateCategoryService,
    DiscordCreateChannelService,
    DiscordCreateRolesService,
    DiscordGuildService,
    DiscordAiGeneratorService,
    DiscordServerCreatorService,
  ],
  controllers: [ServerController],
})
export class ServerModule {}
