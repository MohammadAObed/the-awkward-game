import { Person, PersonImages } from "../models/Person";

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

const TheRock = new Person(1, "The Rock", TheRockImages, "LightWeight");
const Trump = new Person(2, "Trump", TrumpImages, "To the rim");
const Tate = new Person(3, "Tate", TateImages, "What color is your buggatti");

const persons = [TheRock, Trump, Tate];

export default persons;
