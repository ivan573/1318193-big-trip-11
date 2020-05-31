class Offers {
  constructor() {
    this._offers = [];
  }

  getOffers() {
    return this._offers;
  }

  getOfferForType(type) {
    return this._offers.find((offer) => offer.type === type.toLowerCase());
  }

  setOffers(offers) {
    this._offers = Array.from(offers);
  }
}

export {Offers as default};
