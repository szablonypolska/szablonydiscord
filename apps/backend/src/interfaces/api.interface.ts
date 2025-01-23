export interface Api {
  id: number;
  apiKeyId: string;
  secretKey: string;
  name: string;
  dateCreate: Date;
  status: boolean;
  reqCount: number;
  successCount: number;
  errorCount: number;
  lastUsed?: Date;
  monthlyCount: number;
  monthlyLimit: number;
  dailyCount: number;
  dailyLimit: number;
  userId: String;
}
