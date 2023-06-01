import { Handshake } from "./Handshake";

class PersonImages {
  constructor(Happy, Angry, Normal) {
    this.Happy = Happy;
    this.Angry = Angry;
    this.Normal = Normal;
  }
}

const defaultHandshakesOccurance = {
  lowChance: { ids: [], value: 15 }, //15%
  medChance: { ids: [], value: 45 }, //30%
  highChance: { ids: [], value: 100 }, //55%`
  specialChance: { ids: [], value: 10 }, //has priority for checking
};

class Person {
  constructor(
    id = 1,
    name = "",
    images = new PersonImages(),
    signatureLine = "",
    signatureHandshake = new Handshake(),
    handshakesOccurance = defaultHandshakesOccurance,
    moodBreakpoints = { DEFAULT: 0, ANGRY: 30, NORMAL: 60, HAPPY: 100 }
  ) {
    this.id = id;
    this.name = name;
    this.images = images;
    this.signatureLine = signatureLine;
    this.signatureHandshake = signatureHandshake;
    this.handshakesOccurance = handshakesOccurance;
    this.handshakesOccurance.highChance.ids.push(this.signatureHandshake.id, this.signatureHandshake.id);
    this.moodBreakpoints = moodBreakpoints;
  }
  chanceRange = { min: 0, max: 100 };
}

export { PersonImages, Person };
