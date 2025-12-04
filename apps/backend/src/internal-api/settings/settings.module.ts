import { Module } from "@nestjs/common"
import { SharedModule } from '@repo/shared';
import { SettingsController } from "./settings.controller";
import { SettingsService } from "./services/settings.service";
import { SettingsTemplateService } from "./services/settings-template.service";
import { TokenService } from "./services/token.service";
import { SetTokenService } from "./services/set-token.service";

@Module({
	imports: [SharedModule],
    controllers: [SettingsController],
    providers: [SettingsService, SettingsTemplateService, TokenService, SetTokenService],
})

export class SettingsModule {}