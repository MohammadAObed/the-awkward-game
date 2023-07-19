import { Person, PersonAudio, PersonImages } from "../models/Person";
import handshakes from "./Handshake";

//i guess unfortantly this initializes these values evverytime we open the app, try cms or store in storage or other stuff or leave it

const TheRockImages = new PersonImages(require("../assets/images/persons/RockHappy.png"), require("../assets/images/persons/RockAngry.png"), [
  require("../assets/images/persons/RockNormal.png"),
  require("../assets/images/persons/RockNormal2.png"),
]);
const TrumpImages = new PersonImages(require("../assets/images/persons/TrumpHappy.png"), require("../assets/images/persons/TrumpAngry.png"), [
  require("../assets/images/persons/TrumpNormal.png"),
  require("../assets/images/persons/TrumpNormal2.png"),
]);
const CatImages = new PersonImages(require("../assets/images/persons/CatHappy.png"), require("../assets/images/persons/CatAngry.png"), [
  require("../assets/images/persons/CatNormal.png"),
  require("../assets/images/persons/CatNormal2.png"),
]);
const RonaldoImages = new PersonImages(
  require("../assets/images/persons/RonaldoHappy.png"),
  require("../assets/images/persons/RonaldoAngry.png"),
  [require("../assets/images/persons/RonaldoNormal.png"), require("../assets/images/persons/RonaldoNormal2.png")]
);
const DiCaprioImages = new PersonImages(
  require("../assets/images/persons/DiCaprioHappy.png"),
  require("../assets/images/persons/DiCaprioAngry.png"),
  [require("../assets/images/persons/DiCaprioNormal.png"), require("../assets/images/persons/DiCaprioNormal2.png")]
);
const ElonMuskImages = new PersonImages(
  require("../assets/images/persons/ElonMuskHappy.png"),
  require("../assets/images/persons/ElonMuskAngry.png"),
  [require("../assets/images/persons/ElonMuskNormal.png"), require("../assets/images/persons/ElonMuskNormal2.png")]
);
const JohnCenaImages = new PersonImages(
  require("../assets/images/persons/JohnCenaHappy.png"),
  require("../assets/images/persons/JohnCenaAngry.png"),
  [require("../assets/images/persons/JohnCenaNormal.png"), require("../assets/images/persons/JohnCenaNormal2.png")]
);
const KhabyImages = new PersonImages(require("../assets/images/persons/KhabyHappy.png"), require("../assets/images/persons/KhabyAngry.png"), [
  require("../assets/images/persons/KhabyNormal.png"),
  require("../assets/images/persons/KhabyNormal2.png"),
]);
const MarkImages = new PersonImages(require("../assets/images/persons/MarkHappy.png"), require("../assets/images/persons/MarkAngry.png"), [
  require("../assets/images/persons/MarkNormal.png"),
  require("../assets/images/persons/MarkNormal2.png"),
]);
const SpeedImages = new PersonImages(require("../assets/images/persons/SpeedHappy.png"), require("../assets/images/persons/SpeedAngry.png"), [
  require("../assets/images/persons/SpeedNormal.png"),
  require("../assets/images/persons/SpeedNormal2.png"),
]);
const SpongeBobImages = new PersonImages(
  require("../assets/images/persons/SpongeBobHappy.png"),
  require("../assets/images/persons/SpongeBobAngry.png"),
  [require("../assets/images/persons/SpongeBobNormal.png"), require("../assets/images/persons/SpongeBobNormal2.png")]
);

const TheRockAudio = new PersonAudio(
  () => [require("../assets/audio/persons/RockHappy.mp3")],
  () => [require("../assets/audio/persons/RockNormal.mp3")],
  () => [require("../assets/audio/persons/RockAngry.mp3"), require("../assets/audio/persons/RockAngry2.mp3")]
);

const lowValue = 15;
const medValue = 45;
const highValue = 100;
const specialValue = 10;

const TheRock = new Person(
  1,
  "The Rock",
  TheRockImages,
  TheRockAudio,
  "Lookin Rock Solid",
  handshakes.find((h) => h.id === 13),
  {
    highChance: { ids: [1, 2, 3, 6], value: highValue },
    medChance: { ids: [5, 26], value: medValue },
    lowChance: { ids: [8], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  },
  {
    positive: [
      "You've got the strength of a true champion. Keep rocking it!",
      "Your energy is electrifying, just like The Rock. Keep shining!",
      "Wow, what a powerful presence! You're unstoppable!",
      "You're a force to be reckoned with, just like The Rock himself.",
      "You've got the determination and drive of a true winner. Keep it up!",
      "Nobody brings it like you do. You're a true rockstar!",
      "Your charisma and charm light up the room. Keep inspiring!",
      "You're as solid as a rock, unbreakable and unbeatable!",
      "What a powerhouse performance! You're a true legend.",
      "You're rocking the game like The Rock. Keep crushing it!",
      "You're as tough as they come, a real Brahma Bull!",
      "You've got the muscles and the moves. Keep dominating!",
      "You're a winner just like The Rock, destined for greatness!",
    ],
    negative: [
      "That was a weak performance. You need to step up your game!",
      "What a disappointment! You're as flat as a pancake.",
      "You call that a move? It's more like a stumble.",
      "I've seen better performances from amateurs. Try harder!",
      "Your skills are as dull as a rock. You're not impressing anyone.",
      "Pathetic! Your performance lacks the intensity of The Rock.",
      "You're as flexible as a brick. It's painful to watch.",
      "That was a disaster. Maybe it's time to quit the game.",
      "I've seen rocks with more charisma than you. Step aside!",
      "Your performance is a disaster. No wonder you're losing.",
      "You're failing worse than a Rock Bottom. It's embarrassing!",
      "Your moves are as stiff as a statue. Time to find a new career!",
      "You're a loser with no star power. It's time to give up!",
    ],
  }
);
const Trump = new Person(
  2,
  "Trump",
  TrumpImages,
  new PersonAudio(),
  "Let's Make America Great Again!",
  handshakes.find((h) => h.id === 17),
  {
    highChance: { ids: [1, 2, 3, 6], value: highValue },
    medChance: { ids: [5, 7], value: medValue },
    lowChance: { ids: [11], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  },
  {
    positive: [
      "You're doing a fantastic job! Nobody shakes hands like you, believe me.",
      "You've got the best handshakes, tremendous handshakes. Keep it up!",
      "Wow, what a great handshake! You're a winner, just like me.",
      "I've seen a lot of handshakes in my time, but yours is top-notch. Terrific!",
      "You know how to shake hands like a champion. Incredible!",
      "Great handshake, my friend. You've got what it takes to be a winner.",
      "Nobody does handshakes better than you. Keep shaking those hands!",
      "Your handshake is strong, just like the economy. Keep making America proud.",
      "What a tremendous handshake! You're making handshaking great again!",
      "You've got a winning handshake, believe me. Keep shaking hands like a boss!",
      "You're as successful as one of my business deals! Tremendous!",
      "You've got the charisma and charm of a true leader. Keep shining!",
      "You're a winner just like me, destined for greatness. Keep it up!",
    ],
    negative: [
      "That was a terrible handshake. Sad! You should be ashamed.",
      "What a weak handshake! I've seen toddlers with stronger grips.",
      "You call that a handshake? It's a disaster, just like your style.",
      "I've had better handshakes from losers. Step it up!",
      "Your handshake is a total joke. No wonder you're not winning.",
      "Pathetic! Your handshake lacks strength, just like your character.",
      "You can't shake hands properly. It's embarrassing, really.",
      "That handshake is a disaster. Maybe you should quit the game.",
      "I've seen amateurs with better handshakes. You need serious help.",
      "Your handshake is a disaster. No wonder you're losing. Loser!",
      "You're failing worse than one of my failed businesses. Tremendous failure!",
      "Your skills are as bankrupt as my former casinos. Pathetic!",
      "You're a loser with no winning strategy. Step aside!",
    ],
  }
);

const Cat = new Person(
  3,
  "Cat",
  CatImages,
  new PersonAudio(),
  "Meow!",
  handshakes.find((h) => h.id === 5),
  {
    highChance: { ids: [1, 2, 3], value: highValue },
    medChance: { ids: [25], value: medValue },
    lowChance: { ids: [], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  },
  {
    positive: ["meow meow!", "brrr"],
    negative: ["meowwww"],
  }
);

const Ronaldo = new Person(
  4,
  "Ronaldo",
  RonaldoImages,
  new PersonAudio(),
  "Meow!",
  handshakes.find((h) => h.id === 16),
  {
    highChance: { ids: [1, 2, 3, 5], value: highValue },
    medChance: { ids: [6, 7], value: medValue },
    lowChance: { ids: [8], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  },
  {
    positive: ["meow meow!", "brrr"],
    negative: ["meowwww"],
  }
);

const DiCaprio = new Person(
  5,
  "DiCaprio",
  DiCaprioImages,
  new PersonAudio(),
  "Meow!",
  handshakes.find((h) => h.id === 18),
  {
    highChance: { ids: [1, 2, 3, 6], value: highValue },
    medChance: { ids: [5, 7], value: medValue },
    lowChance: { ids: [11], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  },
  {
    positive: ["meow meow!", "brrr"],
    negative: ["meowwww"],
  }
);

const ElonMusk = new Person(
  6,
  "Elon Musk",
  ElonMuskImages,
  new PersonAudio(),
  "Meow!",
  handshakes.find((h) => h.id === 19),
  {
    highChance: { ids: [1, 2, 3, 6], value: highValue },
    medChance: { ids: [5, 7], value: medValue },
    lowChance: { ids: [10], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  },
  {
    positive: ["meow meow!", "brrr"],
    negative: ["meowwww"],
  }
);

const JohnCena = new Person(
  7,
  "John Cena",
  JohnCenaImages,
  new PersonAudio(),
  "Meow!",
  handshakes.find((h) => h.id === 20),
  {
    highChance: { ids: [1, 2, 3, 6, 4], value: highValue },
    medChance: { ids: [5], value: medValue },
    lowChance: { ids: [12], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  },
  {
    positive: ["meow meow!", "brrr"],
    negative: ["meowwww"],
  }
);

const Khaby = new Person(
  8,
  "Khaby",
  KhabyImages,
  new PersonAudio(),
  "Meow!",
  handshakes.find((h) => h.id === 21),
  {
    highChance: { ids: [1, 2, 5, 6], value: highValue },
    medChance: { ids: [3, 7], value: medValue },
    lowChance: { ids: [], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  },
  {
    positive: ["meow meow!", "brrr"],
    negative: ["meowwww"],
  }
);

const Mark = new Person(
  9,
  "Mark",
  MarkImages,
  new PersonAudio(),
  "Meow!",
  handshakes.find((h) => h.id === 22),
  {
    highChance: { ids: [6, 1, 2, 3], value: highValue },
    medChance: { ids: [9], value: medValue },
    lowChance: { ids: [8], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  },
  {
    positive: ["meow meow!", "brrr"],
    negative: ["meowwww"],
  }
);

const Speed = new Person(
  10,
  "Speed",
  SpeedImages,
  new PersonAudio(),
  "Meow!",
  handshakes.find((h) => h.id === 23),
  {
    highChance: { ids: [1, 2, 3, 4], value: highValue },
    medChance: { ids: [5, 6, 7], value: medValue },
    lowChance: { ids: [8], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  },
  {
    positive: ["meow meow!", "brrr"],
    negative: ["meowwww"],
  }
);

const SpongeBob = new Person(
  11,
  "SpongeBob",
  SpongeBobImages,
  new PersonAudio(),
  "Meow!",
  handshakes.find((h) => h.id === 24),
  {
    highChance: { ids: [1, 2, 3, 6], value: highValue },
    medChance: { ids: [5, 9], value: medValue },
    lowChance: { ids: [], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  },
  {
    positive: ["meow meow!", "brrr"],
    negative: ["meowwww"],
  }
);

const persons = [TheRock, Trump, Cat, Ronaldo, DiCaprio, ElonMusk, JohnCena, Khaby, Mark, Speed, SpongeBob];

export default persons;
