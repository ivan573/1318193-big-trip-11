class Destinations {
  constructor() {
    this._destinations = [];
    this._destinationsList = [];
  }

  getDestinations() {
    return this._destinations;
  }

  getDestinationsList() {
    return this._destinationsList;
  }

  getDestinationForName(name) {
    return this._destinations.find((destination) => destination.name === name);
  }

  setDestinations(destinations) {
    this._destinations = Array.from(destinations);
    this._destinationsList = this._destinations.map((it) => it.name);
  }
}

export {Destinations as default};
