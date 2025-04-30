import { Message } from './message.inteface';

enum Status {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

export interface Chat {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  subject: string;
  description: string;
  status: Status;
  userId: string;
  agent?: string;
  message: Message[];
}
