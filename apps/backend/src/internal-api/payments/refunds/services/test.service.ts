import { Injectable } from '@nestjs/common';
import { NotificationsService } from 'src/notifications/services/notifications.service';

@Injectable()
export class TestService {
  constructor(private notification: NotificationsService) {}
  getTestData() {
    this.notification.sendNotification({
      type: 'SUCCESS',
      title: 'Zwrot  przyjęty',
      description: `Twój zwrot pieniędzy za zamówienie 34 został przyjęty i jest w trakcie realizacji.`,
      userId: '541526393641500675',
    });
  }
}
