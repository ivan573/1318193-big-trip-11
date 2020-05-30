import TripEvent from "./models/trip-event.js";
import Destination from "./models/destination.js";
import Offer from "./models/destination.js";

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getEvents() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/points`, {headers})
      .then((response) => response.json())
      .then(TripEvent.parseEvents);
  }

  getDestinations() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/destinations`, {headers})
      .then((response) => response.json())
      .then(Destination.parseDestinations);
  }

  getOffers() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/offers`, {headers})
      .then((response) => response.json())
      .then(Offer.parseOffers);
  }
};

export {API as default};
