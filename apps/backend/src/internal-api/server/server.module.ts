import { Module } from '@nestjs/common';
import { DiscordServerCreatorService } from './services/create-server.service';
import { ServerController } from './server.controller';
import { GenerateServerSchema } from './services/generate-server-schema.service';
import { WebsocketModule } from 'src/websocket/websocket.module';
import { SharedModule } from '@repo/shared';

@Module({
  imports: [WebsocketModule, SharedModule],
  providers: [DiscordServerCreatorService, GenerateServerSchema],
  controllers: [ServerController],
})
export class ServerModule {}
