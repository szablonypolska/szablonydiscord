import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { WebsocketGateway } from '../websocket.gateway';

@Injectable()
export class OnlineService {
  constructor(
    @Inject(forwardRef(() => WebsocketGateway))
    private readonly websocket: WebsocketGateway,
  ) {}

  private arrayOnlinePeople: string[] = [];

  updateOnline(userId: string) {
    try {
      const checkUserIsOnline = this.arrayOnlinePeople.some(
        (el) => el === userId,
      );

      if (!checkUserIsOnline)
        this.arrayOnlinePeople = [...this.arrayOnlinePeople, userId];

      this.websocket.server.emit('online', {
        userId: userId,
        numberOnline: this.arrayOnlinePeople.length,
      });

      console.log(this.arrayOnlinePeople, this.arrayOnlinePeople.length);
    } catch (err) {
      console.log(err);
    }
  }

  updateOffline(userId: string) {
    try {
      const deleteUserOffline = this.arrayOnlinePeople.filter(
        (el) => el !== userId,
      );

      this.arrayOnlinePeople = deleteUserOffline;

      this.websocket.server.emit('offline', {
        userId: userId,
        numberOnline: this.arrayOnlinePeople.length,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
