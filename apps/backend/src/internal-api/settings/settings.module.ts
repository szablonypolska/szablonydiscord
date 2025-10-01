import { Module } from "@nestjs/common"
import { SharedModule } from '@repo/shared';
import { SettingsController } from "./settings.controller";
import { SettingsService } from "./services/settings.service";
import { SettingsTemplateService } from "./services/settings-template.service";

@Module({
	imports: [SharedModule],
    controllers: [SettingsController],
    providers: [SettingsService, SettingsTemplateService],
})

export class SettingsModule {}