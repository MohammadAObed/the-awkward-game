import { PersonMood } from "../constants/Person";
import { Handshake } from "./Handshake";

class PersonImages {
  constructor(Happy = () => [], Angry = () => [], Normal = () => [], Signature = () => []) {
    this[PersonMood.HAPPY.name] = Happy;
    this[PersonMood.ANGRY.name] = Angry;
    this[PersonMood.NORMAL.name] = Normal;
    this[PersonMood.SIGNATURE.name] = Signature;
  }
}

class PersonAudio {
  constructor(Happy = () => [], Normal = () => [], Angry = () => [], Signature = () => []) {
    this[PersonMood.HAPPY.name] = Happy;
    this[PersonMood.ANGRY.name] = Angry;
    this[PersonMood.NORMAL.name] = Normal;
    this[PersonMood.SIGNATURE.name] = Signature;
  }
}

class PersonLines {
  constructor(Happy = () => [], Normal = () => [], Angry = () => [], Signature = () => []) {
    this[PersonMood.HAPPY.name] = Happy;
    this[PersonMood.ANGRY.name] = Angry;
    this[PersonMood.NORMAL.name] = Normal;
    this[PersonMood.SIGNATURE.name] = Signature;
  }
}

const defaultHandshakesOccurance = {
  lowChance: { ids: [], value: 15 }, //15%
  medChance: { ids: [], value: 45 }, //30%
  highChance: { ids: [], value: 100 }, //55%`
  specialChance: { ids: [], value: 7 }, //has priority for checking over lowChance
};

class Person {
  constructor(
    id = 1,
    name = "",
    images = new PersonImages(),
    audio = new PersonAudio(),
    lines = new PersonLines(),
    signatureLine = "",
    signatureHandshake = new Handshake(),
    handshakesOccurance = defaultHandshakesOccurance,
    moodBreakpoints = { DEFAULT: 0, ANGRY: 30, NORMAL: 60, HAPPY: 100 }
  ) {
    this.id = id;
    this.name = name;
    this.images = images;
    this.audio = audio;
    this.lines = lines;
    this.signatureLine = signatureLine;
    this.signatureHandshake = signatureHandshake;
    this.handshakesOccurance = handshakesOccurance;
    this.handshakesOccurance.highChance.ids.push(this.signatureHandshake.id);
    this.moodBreakpoints = moodBreakpoints;
  }
  chanceRange = { min: 0, max: 100 };
}

export { PersonImages, PersonAudio, Person, PersonLines };
