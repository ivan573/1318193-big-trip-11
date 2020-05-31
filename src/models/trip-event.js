import {capitalizeFirstLetter} from "../utils/common.js";

class TripEvent {
  constructor(data) {
    this.id = data[`id`];
    this.type = capitalizeFirstLetter(data[`type`]);
    this.destination = data[`destination`][`name`];
    this.startDate = new Date(data[`date_from`]).setSeconds(0);
    this.endDate = new Date(data[`date_to`]).setSeconds(0);
    this.cost = data[`base_price`];
    this.isFavorite = Boolean(data[`isFavorite`]);
    this.extraOffers = data[`offers`];
    this.info = {
      description: data[`destination`][`description`],
      photos: data[`destination`][`pictures`]
    } || null;
  }

  toRAW() {
    return {
      "base_price": this.cost,
      "date_from": new Date(this.startDate).toISOString(),
      "date_to": new Date(this.endDate).toISOString(),
      "destination": this.destination,
      "is_favorite": this.isFavorite,
      "offers": this.extraOffers,
      "type": this.type.toLowerCase()
    };
  }

  static parseEvent(data) {
    return new TripEvent(data);
  }

  static parseEvents(data) {
    return data.map(TripEvent.parseEvent);
  }

}

export {TripEvent as default};
