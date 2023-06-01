import { Person, PersonHandshakeOccurance, PersonImages } from "../models/Person";
import handshakes from "./Handshake";

//i guess unfortantly this initializes these values evverytime we open the app, try cms or store in storage or other stuff or leave it

const TheRockImages = new PersonImages(
  require("../assets/images/persons/RockHappy.png"),
  require("../assets/images/persons/RockAngry.png"),
  require("../assets/images/persons/RockNormal.png")
);
const TrumpImages = new PersonImages(
  require("../assets/images/persons/TrumpHappy.png"),
  require("../assets/images/persons/TrumpAngry.png"),
  require("../assets/images/persons/TrumpNormal.png")
);
const TateImages = new PersonImages(
  require("../assets/images/persons/TateHappy.png"),
  require("../assets/images/persons/TateAngry.png"),
  require("../assets/images/persons/TateNormal.png")
);

const lowValue = 15;
const medValue = 45;
const highValue = 100;
const specialValue = 10;

const TheRock = new Person(
  1,
  "The Rock",
  TheRockImages,
  "LightWeight",
  handshakes.find((h) => h.id === 13),
  {
    lowChance: { ids: [8, 9], value: lowValue },
    medChance: { ids: [5, 11, 12], value: medValue },
    highChance: { ids: [1, 2, 3, 4, 6, 7], value: highValue },
    specialChance: { ids: [10], value: specialValue },
  }
);
const Trump = new Person(
  2,
  "Trump",
  TrumpImages,
  "To the rim",
  handshakes.find((h) => h.id === 14),
  {
    lowChance: { ids: [8, 9], value: lowValue },
    medChance: { ids: [5, 11], value: medValue },
    highChance: { ids: [1, 2, 3, 4, 6, 7], value: highValue },
    specialChance: { ids: [], value: specialValue },
  }
);
const Tate = new Person(
  3,
  "Tate",
  TateImages,
  "What color is your buggatti",
  handshakes.find((h) => h.id === 15),
  {
    lowChance: { ids: [8, 9], value: lowValue },
    medChance: { ids: [5, 11, 12], value: medValue },
    highChance: { ids: [1, 2, 3, 4, 6, 7], value: highValue },
    specialChance: { ids: [], value: specialValue },
  }
);

const persons = [TheRock, Trump, Tate];

export default persons;
