import { PersonMood } from "../constants/Person";
import { Handshake } from "./Handshake";

class PersonImages {
  constructor(Happy = () => [], Angry = () => [], Normal = () => []) {
    this[PersonMood.HAPPY.name] = Happy;
    this[PersonMood.ANGRY.name] = Angry;
    this[PersonMood.NORMAL.name] = Normal;
  }
}

class PersonAudio {
  constructor(Happy = () => [], Normal = () => [], Angry = () => []) {
    this[PersonMood.HAPPY.name] = Happy;
    this[PersonMood.ANGRY.name] = Angry;
    this[PersonMood.NORMAL.name] = Normal;
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
    audio = new PersonAudio(),
    signatureLine = "",
    signatureHandshake = new Handshake(),
    handshakesOccurance = defaultHandshakesOccurance,
    greetings = { positive: [], negative: [] },
    moodBreakpoints = { DEFAULT: 0, ANGRY: 30, NORMAL: 60, HAPPY: 100 }
  ) {
    this.id = id;
    this.name = name;
    this.images = images;
    this.audio = audio;
    this.signatureLine = signatureLine;
    this.signatureHandshake = signatureHandshake;
    this.handshakesOccurance = handshakesOccurance;
    this.handshakesOccurance.highChance.ids.push(this.signatureHandshake.id, this.signatureHandshake.id);
    this.moodBreakpoints = moodBreakpoints;
    this.greetings = greetings;
  }
  chanceRange = { min: 0, max: 100 };
}

export { PersonImages, PersonAudio, Person };
