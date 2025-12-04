export interface Offer {
  id: string;
  title: string;
  description?: string;
  price: number;
  inStock: number;
  createdAt: Date;
  deliveryMethod: 'EMAIL' | 'AUTOMATIC';
  status: 'ACTIVE' | 'INACTIVE' | 'SOLD';
  category: 'BASIC' | 'PREMIUM' | 'ADVANCED' | 'OTHER';
}
