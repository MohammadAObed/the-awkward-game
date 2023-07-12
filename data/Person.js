import { Person, PersonHandshakeOccurance, PersonImages } from "../models/Person";
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

const lowValue = 15;
const medValue = 45;
const highValue = 100;
const specialValue = 10;

const TheRock = new Person(
  1,
  "The Rock",
  TheRockImages,
  "Lookin Rock Solid",
  handshakes.find((h) => h.id === 13),
  {
    lowChance: { ids: [8, 9], value: lowValue },
    medChance: { ids: [5, 11, 12], value: medValue },
    highChance: { ids: [1, 2, 3, 4, 6, 7], value: highValue },
    specialChance: { ids: [10], value: specialValue },
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
  "Let's Make America Great Again!",
  handshakes.find((h) => h.id === 14),
  {
    lowChance: { ids: [8, 9], value: lowValue },
    medChance: { ids: [5, 11], value: medValue },
    highChance: { ids: [1, 2, 3, 4, 6, 7], value: highValue },
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

const persons = [TheRock, Trump];

export default persons;
