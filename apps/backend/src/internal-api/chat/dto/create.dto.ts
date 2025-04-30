// id String @id @default(uuid())
// createdAt DateTime @default(now())
// updatedAt DateTime @updatedAt
// subject String
// description String
// userId String
// agent String?

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
