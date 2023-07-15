import { Common } from "./Common";

class Handshake {
  constructor(id = 1, symbol = "✋", rotation = 0, personRotation = 180, translateX = 0, translateY = 0, invert = 1, personInvert = 1) {
    this.id = id;
    this.symbol = symbol;
    this.rotation = rotation;
    this.personRotation = personRotation;
    this.translateX = translateX;
    this.translateY = translateY;
    this.invert = invert;
    this.personInvert = personInvert;
  }
}

export { Handshake };
