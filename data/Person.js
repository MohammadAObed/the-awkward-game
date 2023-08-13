import { Person, PersonAudio, PersonImages, PersonLines } from "../models/Person";
import handshakes from "./Handshake";

//i guess unfortantly this initializes these values evverytime we open the app, try cms or store in storage or other stuff or leave it, Done Lazy loadng with anonymous functions

const TheRockImages = new PersonImages(
  () => [require("../assets/images/persons/RockHappy.png")],
  () => [require("../assets/images/persons/RockAngry.png")],
  () => [require("../assets/images/persons/RockNormal.png"), require("../assets/images/persons/RockNormal2.png")],
  () => [require("../assets/images/persons/RockSign.png")]
);
const TrumpImages = new PersonImages(
  () => [require("../assets/images/persons/TrumpHappy.png")],
  () => [require("../assets/images/persons/TrumpAngry.png")],
  () => [require("../assets/images/persons/TrumpNormal.png"), require("../assets/images/persons/TrumpNormal2.png")],
  () => [require("../assets/images/persons/TrumpSign.png")]
);
const CatImages = new PersonImages(
  () => [require("../assets/images/persons/CatHappy.png")],
  () => [require("../assets/images/persons/CatAngry.png")],
  () => [require("../assets/images/persons/CatNormal.png"), require("../assets/images/persons/CatNormal2.png")],
  () => [require("../assets/images/persons/CatAngry.png")]
);
const RonaldoImages = new PersonImages(
  () => [require("../assets/images/persons/RonaldoHappy.png")],
  () => [require("../assets/images/persons/RonaldoAngry.png")],
  () => [require("../assets/images/persons/RonaldoNormal.png"), require("../assets/images/persons/RonaldoNormal2.png")],
  () => [require("../assets/images/persons/RonaldoSign.png")]
);
const DiCaprioImages = new PersonImages(
  () => [require("../assets/images/persons/DiCaprioHappy.png")],
  () => [require("../assets/images/persons/DiCaprioAngry.png")],
  () => [require("../assets/images/persons/DiCaprioNormal.png"), require("../assets/images/persons/DiCaprioNormal2.png")],
  () => [require("../assets/images/persons/DiCaprioSign.png")]
);
const ElonMuskImages = new PersonImages(
  () => [require("../assets/images/persons/ElonMuskHappy.png")],
  () => [require("../assets/images/persons/ElonMuskAngry.png")],
  () => [require("../assets/images/persons/ElonMuskNormal.png"), require("../assets/images/persons/ElonMuskNormal2.png")],
  () => [require("../assets/images/persons/ElonMuskSign.png")]
);
const JohnCenaImages = new PersonImages(
  () => [require("../assets/images/persons/JohnCenaHappy.png")],
  () => [require("../assets/images/persons/JohnCenaAngry.png")],
  () => [require("../assets/images/persons/JohnCenaNormal.png"), require("../assets/images/persons/JohnCenaNormal2.png")],
  () => [require("../assets/images/persons/JohnCenaHappy.png")]
);
const KhabyImages = new PersonImages(
  () => [require("../assets/images/persons/KhabyHappy.png")],
  () => [require("../assets/images/persons/KhabyAngry.png")],
  () => [require("../assets/images/persons/KhabyNormal.png"), require("../assets/images/persons/KhabyNormal2.png")],
  () => [require("../assets/images/persons/KhabyAngry.png")]
);
const MarkImages = new PersonImages(
  () => [require("../assets/images/persons/MarkHappy.png")],
  () => [require("../assets/images/persons/MarkAngry.png")],
  () => [require("../assets/images/persons/MarkNormal.png"), require("../assets/images/persons/MarkNormal2.png")],
  () => [require("../assets/images/persons/MarkHappy.png")]
);
const SpeedImages = new PersonImages(
  () => [require("../assets/images/persons/SpeedHappy.png")],
  () => [require("../assets/images/persons/SpeedAngry.png")],
  () => [require("../assets/images/persons/SpeedNormal.png"), require("../assets/images/persons/SpeedNormal2.png")],
  () => [require("../assets/images/persons/SpeedNormal.png")]
);
const SpongeBobImages = new PersonImages(
  () => [require("../assets/images/persons/SpongeBobHappy.png")],
  () => [require("../assets/images/persons/SpongeBobAngry.png")],
  () => [require("../assets/images/persons/SpongeBobNormal.png"), require("../assets/images/persons/SpongeBobNormal2.png")],
  () => [require("../assets/images/persons/SpongeBobSign.png")]
);

const TheRockAudio = new PersonAudio(
  () => [require("../assets/audio/persons/RockHappy.mp3")],
  () => [require("../assets/audio/persons/RockNormal.mp3")],
  () => [require("../assets/audio/persons/RockAngry.mp3"), require("../assets/audio/persons/RockAngry2.mp3")],
  () => [require("../assets/audio/persons/RockSign.mp3")]
);

const TrumpAudio = new PersonAudio(
  () => [require("../assets/audio/persons/TrumpHappy.mp3")],
  () => [require("../assets/audio/persons/TrumpNormal.mp3")],
  () => [require("../assets/audio/persons/TrumpAngry.mp3")],
  () => [require("../assets/audio/persons/TrumpSign.mp3")]
);

const CatAudio = new PersonAudio(
  () => [require("../assets/audio/persons/CatHappy.mp3")],
  () => [require("../assets/audio/persons/CatNormal.mp3")],
  () => [require("../assets/audio/persons/CatAngry.mp3")],
  () => [require("../assets/audio/persons/CatSign.mp3")]
);

const DiCaprioAudio = new PersonAudio(
  () => [require("../assets/audio/persons/DiCaprioHappy.mp3")],
  () => [require("../assets/audio/persons/DiCaprioNormal.mp3")],
  () => [require("../assets/audio/persons/DiCaprioAngry.mp3")],
  () => [require("../assets/audio/persons/DiCaprioSign.mp3")]
);

const RonaldoAudio = new PersonAudio(
  () => [require("../assets/audio/persons/RonaldoHappy.mp3")],
  () => [require("../assets/audio/persons/RonaldoNormal.mp3")],
  () => [require("../assets/audio/persons/RonaldoAngry.mp3")],
  () => [require("../assets/audio/persons/RonaldoSign.mp3")]
);

const ElonAudio = new PersonAudio(
  () => [require("../assets/audio/persons/ElonHappy.mp3")],
  () => [require("../assets/audio/persons/ElonNormal.mp3")],
  () => [require("../assets/audio/persons/ElonAngry.mp3")],
  () => [require("../assets/audio/persons/ElonSign.mp3")]
);

const CenaAudio = new PersonAudio(
  () => [require("../assets/audio/persons/CenaHappy.mp3")],
  () => [require("../assets/audio/persons/CenaNormal.mp3")],
  () => [require("../assets/audio/persons/CenaAngry.mp3")],
  () => [require("../assets/audio/persons/CenaSign.mp3"), require("../assets/audio/persons/CenaSign2.mp3")]
);

const KhabyAudio = new PersonAudio(
  () => [require("../assets/audio/persons/KhabyHappy.mp3")],
  () => [],
  () => [],
  () => []
);

const MarkAudio = new PersonAudio(
  () => [require("../assets/audio/persons/MarkHappy.mp3")],
  () => [require("../assets/audio/persons/MarkNormal.mp3")],
  () => [require("../assets/audio/persons/MarkAngry.mp3")],
  () => [require("../assets/audio/persons/MarkSign.mp3")]
);

const SpeedAudio = new PersonAudio(
  () => [require("../assets/audio/persons/SpeedHappy.mp3")],
  () => [require("../assets/audio/persons/SpeedNormal.mp3")],
  () => [require("../assets/audio/persons/SpeedAngry.mp3")],
  () => [require("../assets/audio/persons/SpeedSign.mp3")]
);

const SpongeAudio = new PersonAudio(
  () => [require("../assets/audio/persons/SpongeHappy.mp3")],
  () => [require("../assets/audio/persons/SpongeNormal.mp3")],
  () => [require("../assets/audio/persons/SpongeAngry.mp3")],
  () => [require("../assets/audio/persons/SpongeSign.mp3")]
);

//! dont forget to see bard answers and mix it with below, take out the bad stuff

const TheRockLines = new PersonLines(
  () => [
    "You're an absolute beast in the game!",
    "Your charisma is infectious",
    "Amazed by your incredible energy!",
    "Your work ethic and drive are truly inspiring!",
    "That's a rock-solid handshake! You leave a lasting impression!",
    "Nailed the handshake! Just like I nail my movies!",
    "I like your style",
  ],
  () => [
    "Interesting approach.",
    "Stay focused.",
    "A for effort. Keep honing your skills.",
    "Not bad, but there's room for improvement.",
    "You're getting there. Consistency is key.",
    "You've shown promise.",
    "Hmm, your handshake could use a little more power.",
    "That's a firm grip! Keep it consistent.",
    "Your handshake game is solid",
  ],
  () => [
    "Your handshake needs some work, no offense.",
    "Well, that was an attempt... not quite",
    "Fast & Furiously Effortless",
    "Swinging, but you're missing the mark",
    "Your handshake needs work, but don't worry, I got you!",
    "That's not how you greet The Rock",
    "The handshake needs improvement, but with my guidance, you'll get there!",
    "A little more Rock magic in the handshake needed, let's electrify!",
  ],
  () => [
    "My Bad, Wrong Emote!",
    "With my eyebrow, I question your statements",
    "Your handshake speaks volumes about your character – electrify the world!",
    "You are raised good, like those Raised Eyebrow",
  ]
);

const TrumpLines = new PersonLines(
  () => [
    "You're a winner, just like me!",
    "Tremendous handshake!",
    "Your charisma is huge, believe me! People love your handshake!",
    "your handshake speaks power!",
    "Your work ethic is incredible, just like my presidency!",
    "That's a strong grip, just like my grip with cash",
    "You bring joy and winning to everyone around you!",
    "Your handshake is legendary, just like my leadership!",
    "Nailed the handshake! Just like I nailed the deals!",
    "We're on the winning path!",
  ],
  () => [
    "Interesting approach, but let me show you how a real handshake is done!",
    "Solid effort, but you need to be a winner, like me!",
    "Not bad, but my handshakes are always top-notch!",
    "A decent effort, but you can do better, believe me!",
    "You're getting there, but my handshake is the best!",
    "You've shown promise, but you're not quite Trump-level yet!",
    "Hmm, your handshake could use a little more confidence!",
    "That's a good grip, but let's make it great",
    "Your handshake game is strong, but I'm the master!",
  ],
  () => [
    "Your handshake needs some work, believe me, no offense!",
    "You're fired!",
    "Your handshake needs work, but don't worry, I'll help you!",
    "Better luck next time, keep practicing those handshakes!",
    "not a winner's choice!",
    "That's not how you greet like a winner – let me teach you!",
    "Move away, im taking your ride",
    "A little more Trump magic in the handshake needed",
    "You'll master handshakes with my guidance – let's make them great!",
  ],
  () => [
    "Even I can't resist your gesture – it's tremendous!",
    "You've got the Trump charm – keep it up!",
    "You Raise the finger, you become a tremendous thinker",
    "You know how to win an argument",
    "With that gesture, you've won the deal",
  ]
);

const CatLines = new PersonLines(
  () => ["Purr", "Mrrp", "Pirp", "Meow-purr"],
  () => ["Meow", "Mew", "Miaow", "Mraow", "Mreow"],
  () => ["Hiss", "Hissss", "Miaowwwrrr", "Thanks Sir :("],
  () => ["Meoooow"]
);

const RonaldoLines = new PersonLines(
  () => [
    "You see, my handshake is like my goals – precise and unstoppable!",
    "When I shake your hand, it's like the ball hitting the back of the net!",
    "They call me the goat, and you are the goat of handshakes",
    "My handshake is as powerful as my headers – you won't forget it!",
    "You're in the presence of Ronaldo - cherish the moment!",
    "That's a firm grip, just like my determination to win!",
    "handshake game is top-notch – just like my skills on the pitch!",
    "Let's take a selfie",
  ],
  () => [
    "Interesting approach, my friend. Maybe add some Ronaldo flair next time!",
    "Solid effort, but I expect excellence",
    "Not bad, but you'll need to step up your game to match my handshake!",
    "A decent effort. Keep refining your style, like I do with my shots!",
    "You're getting there, but you'll need more practice to match me!",
    "You've shown promise, but my handshakes are in a league of their own!",
    "Hmm, your handshake could use a little more Ronaldo magic.",
    "That's a good grip, but let me show you how a GOAT does it!",
    "Your handshake game is decent, but it's not my standard!",
  ],
  () => [
    "Who is that guy, hahaha",
    "no precision, you're missing the mark",
    "Better luck next time, keep practicing!",
    "A little more Ronaldo magic in the handshake needed",
    "You'll master handshakes with dedication And Hard Work",
    "Move of the way kid",
  ],
  () => ["siuuuuuuuuu", "muchas gracias aficion, siuuuuu", "I miss madrid"]
);

const DiCaprioLines = new PersonLines(
  () => [
    "You're extraordinary, my friend!",
    "Amazed by your incredible talent and positive energy!",
    "great acting, pretending to like me!",
    "Nailed the handshake! Just like an Oscar-worthy performance!",
    "Your handshake is mesmerizing, just like Leo's acting!",
    "You're a true actor",
    "You had my curiosity… but now you have my attention",
  ],
  () => [
    "Interesting approach. Keep it up!",
    "You're making progress. Stay focused.",
    "Two little mice fell in a bucket of cream...",
    "Impressive handshake! You've got that DiCaprio charm!",
    "Your handshake game is solid, but let's elevate it to the next level!",
  ],
  () => [
    "Dreams feel real, and your handshake is a nightmare",
    "Your handshake needs some work",
    "I'm not afraid to get my hands dirty.",
    "deal dont mean nothing, until you dont shake my hand",
  ],
  () => ["look look...", "here it come, here it come", "watch watch..."]
);

const ElonMuskLines = new PersonLines(
  () => [
    "You're a visionary, just like me!",
    "A true innovator, your passion is unstoppable!",
    "Your determination and drive are truly inspiring!",
    "Nailed the handshake! Just like a successful SpaceX launch!",
    "Your handshake is as electrifying as the Tesla!",
    "You're like the Elon Musk of handshakes – revolutionary!",
    "You're a risk-taker.",
  ],
  () => [
    "You've shown promise. Keep challenging yourself.",
    "Hmm, your handshake could use a little more innovation.",
    "That's a firm grip! and i got a lot of firms",
    "Your handshake is on par with your ideas – just like Elon!",
    "Your handshake buisness is solid, but let's innovate further!",
  ],
  () => [
    "Well, that was an attempt... not quite innovative!",
    "Swinging, but you're missing the mark – focus on the innovation!",
    "Looks like you're avoiding handshakes today – let's change that!",
    "That's not how you greet Elon",
    "A little more Musk innovation in the handshake needed!",
    "You'll master handshakes with my coaching",
    "Imma lay you off when i takeover your company",
  ],
  () => [
    "I'm not a fan of the word 'thumbs down.'",
    "I don't always handshake, i thumbs up",
    "You're like a meme king with that handshake – Musk-approved!",
    "Did you learn that handshake from SpaceX? It's out of this world!",
    "Your handshake makes waves like Tesla's electric cars!",
    "Okay, are we over",
  ]
);

const JohnCenaLines = new PersonLines(
  () => [
    "You're unstoppable, just like me!",
    "You're the champ!",
    "Amazed by your incredible strength",
    "That's a solid handshake! You leave a lasting impact!",
    "You bring excitement and motivation to everyone around you!",
    "Nailed the handshake! Just like a wrestling victory!",
    "You're a true champion, even in handshakes!",
    "if there is a belt won in handshakes, you're the one",
  ],
  () => [
    "Interesting approach. Keep it up, my friend!",
    "You're making progress. Stay focused.",
    "Solid effort. Keep honing your skills.",
    "Not bad, but there's room for improvement.",
    "Hmm, your handshake could use a little more rumble.",
    "That's a firm grip! and i have a firm punch",
    "Impressive handshake! You've got that Cena charm!",
    "Your handshake game is solid, but let's amp up the attitude!",
  ],
  () => [
    "Your handshake needs some work, no offense.",
    "Well, that was an attempt... not quite legendary!",
    "Smoother moves in a baby's first steps – work on it!",
    "Better luck next time, keep practicing those handshakes!",
    "wha... what was that!",
  ],
  () => ["Did you learn that handshake from WWE? It's raw!", "Cena approves of your amazing shake", "I dissapear", "You can't see me"]
);

const KhabyLines = new PersonLines(
  () => [
    "Your expressions are gold!",
    "Your charisma is contagious – everyone is laughing!",
    "A true comedian, your humor is unmatched!",
    "Your reactions and gestures are truly hilarious!",
    "That's a solid handshake! You leave a lasting impression!",
    "You bring joy and laughter to everyone around!",
  ],
  () => [
    "Interesting approach. Keep it funny, my friend!",
    "Solid effort. Keep honing your humor.",
    "You're getting there. Consistency is key.",
    "You've shown promise. Keep entertaining!",
    "That's a firm grip! Keep it funny.",
    "Your handshake is on par with your humor – just like Khaby Lame!",
  ],
  () => [
    "Your handshake needs some comedic work, no offense.",
    "Swinging, but you're missing the humor – focus on the laughs!",
    "Better luck next time, keep practicing those funny handshakes!",
    "Looks like you're avoiding comedic handshakes today – let's change that!",
    "The handshake needs more laughs, but with my guidance, you'll get there!",
    "A little more Khaby humor in the handshake needed!",
  ],
  () => ["🤲", "Really!", "..."]
);

const MarkLines = new PersonLines(
  () => [
    "You're a true innovator",
    "A visionary, your passion for technology is unmatched!",
    "this handshake is meta good",
    "your handshakes are meta vers-atile",
    "Zuck approves",
    "Can you feel the future in the handshake? It's groundbreaking!",
    "You're a true tech guru, even in handshakes!",
    "You're going to change the world.",
  ],
  () => [
    "Interesting approach. Keep it up, my friend!",
    "Not bad, but there's room for improvement.",
    "A decent effort. Keep refining your style.",
    "You've shown promise. Keep exploring new possibilities.",
    "Hmm, your handshake could use a little more innovation.",
    "Impressive handshake! You've got that Zuckerberg charm!",
  ],
  () => [
    "Your handshake needs some improvement, no offense.",
    "Well, that was an attempt... not quite good!",
    "Looks like you're avoiding tech-inspired handshakes today",
    "That's not how you greet like Zuckerberg",
    "A little more Zuckerberg spirit in the handshake needed!",
    "i prefer not to share",
  ],
  () => [":)"]
);

const SpeedLines = new PersonLines(
  () => ["Let's get this dub!", "I'm so good at this game!", "suuiii", "you matched my speed"],
  () => ["suuuiii", "yeah!", "guess what! AAHhhh"],
  () => [
    "Well, that was an attempt... awful attempt",
    "good one, sike!! do better...",
    "try matching my speed",
    "That's not how you say hi to me",
    "Handshake worse than my rages",
  ],
  () => ["trash!", "You're a bot!", "You're a noob!", "waste of time!", "uninstall!", "Grrrrrr"]
);

const SpongeBobLines = new PersonLines(
  () => [
    "You're an absolute ray of sunshine!",
    "I'm so glad we're friends, dude.",
    "Your enthusiasm is infectious everyone adores you!",
    "That's a sponge-tastic handshake! You leave a lasting impression!",
    "You bring happiness and laughter to everyone around!",
    "Nailed the handshake! Just like a jellyfishing adventure!",
    "Your handshake is as energetic as a Krusty Krab song!",
    "You're like the SpongeBob of handshakes full of cheer!",
    "Can you feel the fun in the handshake? It's legendary!",
    "You're a real friend, pal.",
  ],
  () => [
    "Interesting approach, buddy! Keep it up!",
    "You're making progress. Stay bubbly!",
    "Solid effort. Keep spreading positivity.",
    "Patrick, you're a... can do better",
    "Not bad, but there's room for more laughs.",
    "Your handshake is on par with your cheerfulness just like SpongeBob!",
    "Impressive handshake! You've got that SpongeBob charm!",
    "try again, and we will be squared",
  ],
  () => [
    "You're a square.",
    "Your handshake needs some sauce.",
    "Well, that was an attempt... not quite sponge-worthy!",
    "Your handshake needs work, but don't worry, I got you!",
    "Better luck next time, keep practicing those fun handshakes!",
    "That's not how you say hi to SpongeBob",
    "A little more SpongeBob spirit in the handshake needed!",
    "Handshake worse than my driving lessons",
  ],
  () => [
    "Even I can't resist your Sponge-tastic handshake! :(",
    "Life's short, bring the SpongeBob cheer to handshakes!",
    "You're like a meme king with that handshake – SpongeBob-approved!",
    "Did you learn that handshake from an episode?",
    "Sitting alone, can you drop your phone",
    "when is the meal, i wish for once someone could make me the burger",
  ]
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
  TheRockLines,
  "Lookin Rock Solid",
  handshakes.find((h) => h.id === 13),
  {
    highChance: { ids: [1, 2, 3, 6], value: highValue },
    medChance: { ids: [5, 26], value: medValue },
    lowChance: { ids: [], value: lowValue },
    specialChance: { ids: [28], value: specialValue },
  }
);
const Trump = new Person(
  2,
  "Trump",
  TrumpImages,
  TrumpAudio,
  TrumpLines,
  "Believe me, Tremendous",
  handshakes.find((h) => h.id === 17),
  {
    highChance: { ids: [1, 2, 3, 6], value: highValue },
    medChance: { ids: [5, 7], value: medValue },
    lowChance: { ids: [11], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  }
);

const Cat = new Person(
  3,
  "Cat",
  CatImages,
  CatAudio,
  CatLines,
  "Meow",
  handshakes.find((h) => h.id === 5),
  {
    highChance: { ids: [1, 2, 3], value: highValue },
    medChance: { ids: [25], value: medValue },
    lowChance: { ids: [], value: lowValue },
    specialChance: { ids: [27], value: specialValue },
  }
);

const Ronaldo = new Person(
  4,
  "Ronaldo",
  RonaldoImages,
  RonaldoAudio,
  RonaldoLines,
  "Siuuuuuuuuuuuu",
  handshakes.find((h) => h.id === 16),
  {
    highChance: { ids: [1, 2, 3, 5], value: highValue },
    medChance: { ids: [6, 7], value: medValue },
    lowChance: { ids: [8], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  }
);

const DiCaprio = new Person(
  5,
  "DiCaprio",
  DiCaprioImages,
  DiCaprioAudio,
  DiCaprioLines,
  "I insist!",
  handshakes.find((h) => h.id === 18),
  {
    highChance: { ids: [1, 2, 3, 6], value: highValue },
    medChance: { ids: [5, 7], value: medValue },
    lowChance: { ids: [11], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  }
);

const ElonMusk = new Person(
  6,
  "Elon Musk",
  ElonMuskImages,
  ElonAudio,
  ElonMuskLines,
  "Imma let you keep your job",
  handshakes.find((h) => h.id === 19),
  {
    highChance: { ids: [1, 2, 3, 6], value: highValue },
    medChance: { ids: [5, 7], value: medValue },
    lowChance: { ids: [10], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  }
);

const JohnCena = new Person(
  7,
  "John Cena",
  JohnCenaImages,
  CenaAudio,
  JohnCenaLines,
  "You can't see me",
  handshakes.find((h) => h.id === 20),
  {
    highChance: { ids: [1, 2, 3, 6, 4], value: highValue },
    medChance: { ids: [5], value: medValue },
    lowChance: { ids: [12], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  }
);

const Khaby = new Person(
  8,
  "Khaby",
  KhabyImages,
  KhabyAudio,
  KhabyLines,
  "🤲",
  handshakes.find((h) => h.id === 21),
  {
    highChance: { ids: [1, 2, 5, 6], value: highValue },
    medChance: { ids: [3, 7], value: medValue },
    lowChance: { ids: [], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  }
);

const Mark = new Person(
  9,
  "Mark",
  MarkImages,
  MarkAudio,
  MarkLines,
  ":)",
  handshakes.find((h) => h.id === 22),
  {
    highChance: { ids: [6, 1, 2, 3], value: highValue },
    medChance: { ids: [9], value: medValue },
    lowChance: { ids: [8], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  }
);

const Speed = new Person(
  10,
  "Speed",
  SpeedImages,
  SpeedAudio,
  SpeedLines,
  "Crista Ronaldo, sui",
  handshakes.find((h) => h.id === 23),
  {
    highChance: { ids: [1, 2, 3, 4], value: highValue },
    medChance: { ids: [5, 6, 7], value: medValue },
    lowChance: { ids: [8], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  }
);

const SpongeBob = new Person(
  11,
  "SpongeBob",
  SpongeBobImages,
  SpongeAudio,
  SpongeBobLines,
  "The recipe of the burger is...",
  handshakes.find((h) => h.id === 24),
  {
    highChance: { ids: [1, 2, 3, 6], value: highValue },
    medChance: { ids: [5, 9], value: medValue },
    lowChance: { ids: [], value: lowValue },
    specialChance: { ids: [], value: specialValue },
  }
);

const persons = [TheRock, Trump, Cat, Ronaldo, DiCaprio, ElonMusk, JohnCena, Khaby, Mark, Speed, SpongeBob];

export default persons;
