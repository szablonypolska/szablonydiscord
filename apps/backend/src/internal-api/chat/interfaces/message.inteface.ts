enum Type {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SYSTEM = 'SYSTEM',
}

export interface Message {
  content: string;
  type: Type;
  author: string;
  authorId: string;
  chatId: string;
}
