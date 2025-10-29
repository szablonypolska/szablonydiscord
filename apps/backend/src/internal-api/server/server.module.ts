import { Module } from '@nestjs/common';
import { ServerController } from './server.controller';
import { GenerateServerSchema } from './services/generate-server-schema.service';
import { WebsocketModule } from 'src/websocket/websocket.module';
import { SharedModule } from '@repo/shared';
import { DiscordCreateCategoryService } from './services/category/discord-category.service';
import { DiscordCreateChannelService } from './services/channel/discord-channel.service';
import { DiscordCreateRolesService } from './services/role/discord-roles.service';
import { DiscordGuildService } from './services/guild/discord-guild.service';
import { DiscordAiGeneratorService } from './services/analysis/analysis.service';
import { DiscordServerCreatorService } from './services/discord-server-creator.service';
import { DiscordChooseToken } from './services/authentication.service';
import { PublishTemplate } from './services/publish.service';
import { LocalSharedModule } from 'src/shared/shared.module';
import { BuilderEmitterService } from './services/emitter/builder-emitter.service';
import { AiStreamService } from './services/analysis/ai-stream.service';
import { AnalysisResultSaveAndEmitService } from './services/analysis/save.service';
import { CreateCategoriesService } from './services/category/create-category.service';

@Module({
  imports: [WebsocketModule, SharedModule, LocalSharedModule],
  providers: [
    GenerateServerSchema,
    DiscordCreateCategoryService,
    DiscordCreateChannelService,
    DiscordCreateRolesService,
    DiscordGuildService,
    DiscordAiGeneratorService,
    DiscordServerCreatorService,
    DiscordChooseToken,
    PublishTemplate,
    BuilderEmitterService,
    AiStreamService,
    AnalysisResultSaveAndEmitService,
    CreateCategoriesService,
  ],
  controllers: [ServerController],
})
export class ServerModule {}
