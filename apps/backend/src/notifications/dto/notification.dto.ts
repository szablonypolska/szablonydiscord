import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class NotificationDto {
  @IsString()
  @IsIn(['warning', 'success', 'error'])
  type: 'warning' | 'success' | 'error';

  @IsNotEmpty()
  @IsString()
  title;

  @IsNotEmpty()
  @IsString()
  description;

  @IsNotEmpty()
  @IsString()
  userId;
}

// model Notification {
//     id Int @id @default(autoincrement())
//     type String
//     title String
//     description String
//     dateAdd DateTime @default(now())
//     userId String
//     user User @relation(fields: [userId], references: [userId])
//   }
