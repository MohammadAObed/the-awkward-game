import { PersonMeetUpLines } from "../models/PersonMeetupLines";

const TheRockMeetUpLines = new PersonMeetUpLines(
  1,
  () => ["Blessed and grateful!", "Flex those biceps baby!", "Wanna break the lock? use the rock", "lets go grind, if you don't mind"],
  () => [
    "Can you smell what The Rock is cooking?",
    "Just bring it!",
    "Finally, The Rock has been summoned",
    "The People's Champ!",
    "You've awoken the beast!",
    "Protien Powder?, say it Louder!",
  ],
  () => [
    "You just crossed the line!",
    "Get ready for a world of pain!",
    "You won't like me when I'm angry!",
    "Prepare for the wrath of The Rock!",
    "Anger is my fuel, you fool!",
    "You'll be wishing you never made me mad!",
    "Let's get serious, or imma be furious",
  ]
);

const TrumpMeetUpLines = new PersonMeetUpLines(
  2,
  () => [
    "Feeling tremendous!",
    "The ride is on me",
    "Lets go where the money goes",
    "Living the dream, let's get some ice cream!",
    "Food's on me, I insist!",
  ],
  () => [
    "lets meet inside, don't want my hair flying",
    "Do you like golf?",
    "I look forward to meet people from all kinds",
    "Be safe, and behave",
    "The concept of shaking hands is absolutely terrible",
  ],
  () => ["Let's compare account numbers", "Make it quick kid", "clock's ticking, what do you want!", "better not make me more angry"]
);

const RonaldoMeetUpLines = new PersonMeetUpLines(
  4,
  () => ["Dreams don't work unless you do.", "I'll let hold my Ballon d'Ors", "Now say, who's the goat!", "Siuuuuuu"],
  () => ["Lets get to work!", "We're swimming today", "They will hate you for being too good", "Lets improve those handshakes"],
  () => [
    "Train hard, Play hard",
    "This time your the ball boy!",
    "Make it fast, I have a training session",
    "Come and I'll put you in the cold recovery machine",
    "No soda! Only water!",
  ]
);

const DiCaprioMeetUpLines = new PersonMeetUpLines(
  5,
  () => ["I'll give you a ticket to the ceremony", "Grateful for the opportunity", "Try to act, normally", "Gentlemen..."],
  () => [
    "Hey brother!",
    "who are you again?",
    "Be thankful for the hard times, for they have made you.",
    "Pay close attention to people who don't clap when you win.",
  ],
  () => ["Enough is enough!", "Know your role and shut your mouth!", "What do you want!"]
);

const ElonMuskMeetUpLines = new PersonMeetUpLines(
  6,
  () => ["The future is exciting and inspiring.", "ride along in my tesla", "Maybe I'll give you a ticket to space"],
  () => ["I've changed twitter, to the better!", "Can we chill in your house?", "I might give you one more chance"],
  () => [
    "I'll send you to space, just dont show me your face",
    "no room for long-term grudges, but there is one for you!",
    "Yeah, let's talk about you being laid off",
    "Nothing personal, try harder",
  ]
);

const JohnCenaMeetUpLines = new PersonMeetUpLines(
  7,
  () => ["Heeey, champ is here!", "Step on the ring, Bing Chilling", "hustle and wrestle"],
  () => ["You want some, come get some!", "Nice muscles bro"],
  () => ["You can't see me!", "come to town, imma knock you down", "Make more effort this time, please"]
);

const KhabyMeetUpLines = new PersonMeetUpLines(
  8,
  () => ["..."],
  () => ["..."],
  () => ["🤲"]
);

const MarkMeetUpLines = new PersonMeetUpLines(
  9,
  () => ["Let's connect and discuss new ideas!", "I'm always open to meet", "come to my office, becuase your handshakes are flawless"],
  () => ["I may add you on facebook", "Let's discuss meta, while eating Wrap with feta", "The biggest risk is not taking any risk."],
  () => ["Let's schedule a meetup! just wait for my call...", "Can't you just text me, boomer", "I'm kinda busy right now, but ok"]
);

const SpeedMeetUpLines = new PersonMeetUpLines(
  10,
  () => ["Ok, we friends now?", "Hey im a big fan", "Crista ronaldo, SUI"],
  () => ["Dubs in the chat, so where do you wanna meet at?", "bashing keyboard sound intensifies...", "Seriouslyyyy"],
  () => ["Just skip skip, skip....", "I'm a lion now, be careful!", "This gonna look nasty bro, but alright", "AAAAAAhhh"]
);

const SpongeBobMeetUpLines = new PersonMeetUpLines(
  11,
  () => ["No license? You don't need a license to drive a sandwich", " you're a genius, Let's meeeet!", "Krusty krab burger, here we come!"],
  () => ["I'm ready!", "alright", "Three hours later...", "Hey, I thought of something funnier than 24… 25!"],
  () => [
    "I'll have you know that I stubbed by toe last week and only cried for 20 minutes.",
    "Wow, look at all these mattresses! I'd rather sleep!",
    "But i'm hanging out with patrick",
  ]
);

const meetupLines = [
  TheRockMeetUpLines,
  TrumpMeetUpLines,
  RonaldoMeetUpLines,
  DiCaprioMeetUpLines,
  ElonMuskMeetUpLines,
  JohnCenaMeetUpLines,
  KhabyMeetUpLines,
  SpongeBobMeetUpLines,
  MarkMeetUpLines,
  SpeedMeetUpLines,
];

export { meetupLines };
