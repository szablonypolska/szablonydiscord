import { OfferType } from 'src/types/offer.types';

export const offerList = (offer: OfferType) => {
  switch (offer) {
    case 'basic':
      return { offer: 'basic', price: 5.5 };
    case 'premium':
      return { offer: 'premium', price: 12.5 };
    case 'advanced':
      return { offer: 'advanced', price: 20.5 };
    default:
      return null;
  }
};
