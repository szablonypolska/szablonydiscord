import { Message } from '../internal-api/chat/interfaces/message.inteface';

export interface TempMessage extends Message {
  tempId: string;
}
