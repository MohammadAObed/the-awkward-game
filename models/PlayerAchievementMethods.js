import { MaxTimesPlayed, MaxTimesSoundPlayed } from "../constants/GameScreen";
import { PersonMood } from "../constants/Person";
import { globalState } from "../global/GameScreen";
import { PlayerAchievement } from "./PlayerAchievement";

//this class and its method, is used for the gameScreen component, it uses and modifies the state (globalstate), never use in another screen, dont use hooks in it (useSelector, etc...)
class PlayerAchievementMethods {
  static Param = {
    playerPersonAchievement: new PlayerAchievement(),
    meterAddedValue: 0,
    newMood: null, //{ name: "Normal", value: 2, imageIndex: 0, audioIndex: 0 },
  };
  static Result = {
    msg: "",
    showAchievement: false,
    requireImage: null,
    methodName: "",
    extraValue: null,
  };
  static MultiLineSepeartor = "!@#";
  //#region Methods
  //#region Signature Methods
  static TheEyebrow = {
    Name: "TheEyebrow",
    DisplayedMsg: "Sus Levels Rising  🤨",
    requireImage: () => require("../assets/awkwardstickers/Rock/TheEyebrow.gif"),
    execute: signatureExecute,
  };
  static TrumpNo = {
    Name: "TrumpNo",
    DisplayedMsg: "No",
    requireImage: () => require("../assets/awkwardstickers/Trump/TrumpNo.gif"),
    execute: signatureExecute,
  };
  static CatSad = {
    Name: "CatSad",
    DisplayedMsg: "No problem  👍",
    requireImage: () => require("../assets/images/persons/CatAngry.png"),
    execute: signatureExecute,
  };
  static RonaldoSiu = {
    Name: "RonaldoSiu",
    DisplayedMsg: "Suuuuiii",
    requireImage: () => require("../assets/images/persons/RonaldoSign.png"),
    execute: signatureExecute,
  };
  static DiCaprioPointing = {
    Name: "DiCaprioPointing",
    DisplayedMsg: "Woh Woh Look!",
    requireImage: () => require("../assets/awkwardstickers/DiCaprio/DiCaprioPointing.gif"),
    execute: signatureExecute,
  };
  static ElonThumbsUp = {
    Name: "ElonThumbsUp",
    DisplayedMsg: "Nicely ok  👍👍",
    requireImage: () => require("../assets/images/persons/ElonMuskSign.png"),
    execute: signatureExecute,
  };
  static CenaYouCantSeeMe = {
    Name: "CenaYouCantSeeMe",
    DisplayedMsg: "You cant see me!",
    requireImage: () => require("../assets/awkwardstickers/Cena/CenaYouCantSeeMe.gif"),
    execute: signatureExecute,
  };
  static KhabyHowItsDone = {
    Name: "KhabyHowItsDone",
    DisplayedMsg: "🤲",
    requireImage: () => require("../assets/images/persons/KhabyAngry.png"),
    execute: signatureExecute,
  };
  static MarkOk = {
    Name: "MarkOk",
    DisplayedMsg: "🙂",
    requireImage: () => require("../assets/images/persons/MarkHappy.png"),
    execute: signatureExecute,
  };
  static SpeedGibberish = {
    Name: "SpeedGibberish",
    DisplayedMsg: "fgdmjhsrgezwer",
    requireImage: () => require("../assets/images/persons/SpeedNormal.png"),
    execute: signatureExecute,
  };
  static SpongeLonely = {
    Name: "SpongeLonely",
    DisplayedMsg: "I'm not quite sure...",
    requireImage: () => require("../assets/images/persons/SpongeBobSign.png"),
    execute: signatureExecute,
  };
  //#endregion
  //#region 100 & 0 Methods
  static Rock100 = {
    Name: "Rock100",
    DisplayedMsg: "100%" + this.MultiLineSepeartor + "True Legend!",
    requireImage: () => require("../assets/awkwardstickers/Rock/Rock100.gif"),
    execute: hundredPercentExecute,
  };

  static Rock0 = {
    Name: "Rock0",
    DisplayedMsg: "0%" + this.MultiLineSepeartor + "Kev! Help me with this dude!",
    requireImage: () => require("../assets/awkwardstickers/Rock/Rock0.jpg"),
    execute: ZeroPercentExecute,
  };

  static Trump100 = {
    Name: "Trump100",
    DisplayedMsg: "100%" + this.MultiLineSepeartor + "Massive Win, Money in your bag!",
    requireImage: () => require("../assets/awkwardstickers/Trump/Trump100.gif"),
    execute: hundredPercentExecute,
  };

  static Trump0 = {
    Name: "Trump0",
    DisplayedMsg: "0%" + this.MultiLineSepeartor + "You're Fired!!!",
    requireImage: () => require("../assets/awkwardstickers/Trump/Trump0.jpg"),
    execute: ZeroPercentExecute,
  };

  static Cat100 = {
    Name: "Cat100",
    DisplayedMsg: "100%" + this.MultiLineSepeartor + "MeMeMeMeow!",
    requireImage: () => require("../assets/awkwardstickers/Cat/Cat100.gif"),
    execute: hundredPercentExecute,
  };

  static Cat0 = {
    Name: "Cat0",
    DisplayedMsg: "0%" + this.MultiLineSepeartor + "Purrrrr!",
    requireImage: () => require("../assets/awkwardstickers/Cat/Cat0.png"),
    execute: ZeroPercentExecute,
  };

  static Ronaldo100 = {
    Name: "Ronaldo100",
    DisplayedMsg: "100%" + this.MultiLineSepeartor + "Aim for better! always!",
    requireImage: () => require("../assets/awkwardstickers/Ronaldo/Ronaldo100.jpg"),
    execute: hundredPercentExecute,
  };

  static Ronaldo0 = {
    Name: "Ronaldo0",
    DisplayedMsg: "0%" + this.MultiLineSepeartor + "Done playing! Done!",
    requireImage: () => require("../assets/awkwardstickers/Ronaldo/Ronaldo0.gif"),
    execute: ZeroPercentExecute,
  };

  static DiCaprio100 = {
    Name: "DiCaprio100",
    DisplayedMsg: "100%" + this.MultiLineSepeartor + "Brilliant!",
    requireImage: () => require("../assets/awkwardstickers/DiCaprio/DiCaprio100.gif"),
    execute: hundredPercentExecute,
  };

  static DiCaprio0 = {
    Name: "DiCaprio0",
    DisplayedMsg: "0%" + this.MultiLineSepeartor + "Don't worry, I know you're acting!",
    requireImage: () => require("../assets/awkwardstickers/DiCaprio/DiCaprio0.gif"),
    execute: ZeroPercentExecute,
  };

  static Elon100 = {
    Name: "Elon100",
    DisplayedMsg: "100%" + this.MultiLineSepeartor + "Come work for me!",
    requireImage: () => require("../assets/awkwardstickers/Elon/Elon100.gif"),
    execute: hundredPercentExecute,
  };

  static Elon0 = {
    Name: "Elon0",
    DisplayedMsg: "0%" + this.MultiLineSepeartor + "You challenged me, I ain't mad",
    requireImage: () => require("../assets/awkwardstickers/Elon/Elon0.jpg"),
    execute: ZeroPercentExecute,
  };

  static Cena100 = {
    Name: "Cena100",
    DisplayedMsg: "100%" + this.MultiLineSepeartor + "Whatca tryna do?",
    requireImage: () => require("../assets/awkwardstickers/Cena/Cena100.jpg"),
    execute: hundredPercentExecute,
  };

  static Cena0 = {
    Name: "Cena0",
    DisplayedMsg: "0%" + this.MultiLineSepeartor + "Cena Approves!",
    requireImage: () => require("../assets/awkwardstickers/Cena/Cena0.gif"),
    execute: ZeroPercentExecute,
  };

  static Khaby100 = {
    Name: "Khaby100",
    DisplayedMsg: "100%" + this.MultiLineSepeartor + "We finally there!",
    requireImage: () => require("../assets/awkwardstickers/Khaby/Khaby100.gif"),
    execute: hundredPercentExecute,
  };

  static Khaby0 = {
    Name: "Khaby0",
    DisplayedMsg: "0%" + this.MultiLineSepeartor + "C'moooooooon!",
    requireImage: () => require("../assets/awkwardstickers/Khaby/Khaby0.jpg"),
    execute: ZeroPercentExecute,
  };

  static Mark100 = {
    Name: "Mark100",
    DisplayedMsg: "100%" + this.MultiLineSepeartor + "🙂",
    requireImage: () => require("../assets/awkwardstickers/Mark/Mark100.gif"),
    execute: hundredPercentExecute,
  };

  static Mark0 = {
    Name: "Mark0",
    DisplayedMsg: "0%" + this.MultiLineSepeartor + "Don't do it again!",
    requireImage: () => require("../assets/awkwardstickers/Mark/Mark0.gif"),
    execute: ZeroPercentExecute,
  };

  static Speed100 = {
    Name: "Speed100",
    DisplayedMsg: "100%" + this.MultiLineSepeartor + "Maaaaaaaasive Dub",
    requireImage: () => require("../assets/awkwardstickers/Speed/Speed100.gif"),
    execute: hundredPercentExecute,
  };

  static Speed0 = {
    Name: "Speed0",
    DisplayedMsg: "0%" + this.MultiLineSepeartor + "I'm over, We are over!",
    requireImage: () => require("../assets/awkwardstickers/Speed/Speed0.jpg"),
    execute: ZeroPercentExecute,
  };

  static SpongeBob100 = {
    Name: "SpongeBob100",
    DisplayedMsg: "100%" + this.MultiLineSepeartor + "Mmmmooooaah",
    requireImage: () => require("../assets/awkwardstickers/SpongeBob/Sponge100.gif"),
    execute: hundredPercentExecute,
  };

  static SpongeBob0 = {
    Name: "SpongeBob0",
    DisplayedMsg: "0%" + this.MultiLineSepeartor + "Hurrrrrrrrrr!",
    requireImage: () => require("../assets/awkwardstickers/SpongeBob/Sponge0.jpg"),
    execute: ZeroPercentExecute,
  };

  //#endregion
  static RockStop = {
    Name: "RockStop",
    DisplayedMsg: "Stop! enough shaking!",
    requireImage: () => require("../assets/awkwardstickers/Rock/RockStop.gif"),
    execute: PersonHadEnoughExecute,
  };

  static RockSeeYouSoon = {
    Name: "RockSeeYouSoon",
    DisplayedMsg: "I hope your audio was up!",
    requireImage: () => require("../assets/awkwardstickers/Rock/RockSeeYouSoon.gif"),
    execute: (param) => MoodAudioExecute(this.RockSeeYouSoon, param, PersonMood.NORMAL.value, 0),
  };

  static RockWink = {
    Name: "RockWink",
    DisplayedMsg: "See ya!" + this.MultiLineSepeartor + "Exp: The Rock's meter is happy and he's winking",
    requireImage: () => require("../assets/awkwardstickers/Rock/RockWink.gif"),
    execute: function (param = PlayerAchievementMethods.Param) {
      let meterValue = globalState.meter.meterValue;
      if (globalState.selectedPersonHandshake.id == 28 && param.meterAddedValue + meterValue >= globalState.person.moodBreakpoints.NORMAL) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static RockSurprised = {
    Name: "RockSurprised",
    DisplayedMsg: "10 reps minimum of flexing!",
    requireImage: () => require("../assets/awkwardstickers/Rock/RockSurprised.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      let bicepFlexStreak = param.playerPersonAchievement.extraValue;
      if (globalState.selectedPlayerHandshake.id === 26) {
        bicepFlexStreak += 1;
        if (bicepFlexStreak >= 10) {
          return {
            msg: this.DisplayedMsg,
            showAchievement: true,
            requireImage: this.requireImage,
            methodName: this.Name,
            extraValue: bicepFlexStreak,
          };
        }
      } else {
        bicepFlexStreak = 0;
      }
      return { ...PlayerAchievementMethods.Result, methodName: this.Name, extraValue: bicepFlexStreak };
    },
  };

  static TrumpNiceThumb = {
    Name: "TrumpNiceThumb",
    DisplayedMsg: "Unmatch handshakes for 5 times straight!" + this.MultiLineSepeartor + "Nice Shaking Pal!",
    requireImage: () => require("../assets/awkwardstickers/Trump/TrumpNiceThumb.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      let noMatchStreak = param.playerPersonAchievement.extraValue;
      if (globalState.timesPlayed <= 0) {
        noMatchStreak = 0;
      }
      if (globalState.selectedPersonHandshake.id !== globalState.selectedPlayerHandshake.id) {
        noMatchStreak += 1;
      }
      if (noMatchStreak >= 5) {
        return {
          msg: this.DisplayedMsg,
          showAchievement: true,
          requireImage: this.requireImage,
          methodName: this.Name,
          extraValue: noMatchStreak,
        };
      }
      return { ...PlayerAchievementMethods.Result, methodName: this.Name, extraValue: noMatchStreak };
    },
  };

  static TrumpFakeNews = {
    Name: "TrumpFakeNews",
    DisplayedMsg: "Get outta here!",
    requireImage: () => require("../assets/awkwardstickers/Trump/TrumpFakeNews.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.selectedPersonHandshake.id === 29) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static RonaldoSuiAudio = {
    Name: "RonaldoSuiAudio",
    DisplayedMsg: "I hope your audio was up!",
    requireImage: () => require("../assets/awkwardstickers/Ronaldo/RonaldoSuiAudio.gif"),
    execute: (param) => MoodAudioExecute(this.RonaldoSuiAudio, param, PersonMood.HAPPY.value, 0),
  };

  static RonaldoDontTouchMe = {
    Name: "RonaldoDontTouchMe",
    DisplayedMsg: "bro, no time for fans or signatures",
    requireImage: () => require("../assets/awkwardstickers/Ronaldo/RonaldoDontTouchMe.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.selectedPlayerHandshake.id === 30 && globalState.selectedPersonHandshake.id !== 30) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static Ronaldo12Sui = {
    Name: "Ronaldo12Sui",
    DisplayedMsg: "7 Siuuuus!" + this.MultiLineSepeartor + "Muchas Gracias! Aficion!",
    requireImage: () => require("../assets/awkwardstickers/Ronaldo/Ronaldo12Sui.gif"),
    execute: function (param = PlayerAchievementMethods.Param) {
      let suiStreak = param.playerPersonAchievement.extraValue;
      if (
        globalState.selectedPersonHandshake.id === globalState.selectedPlayerHandshake.id &&
        globalState.selectedPersonHandshake.id === globalState.person.signatureHandshake.id
      ) {
        suiStreak += 1;
        if (suiStreak >= 7) {
          return {
            msg: this.DisplayedMsg,
            showAchievement: true,
            requireImage: this.requireImage,
            methodName: this.Name,
            extraValue: suiStreak,
          };
        }
      }
      return { ...PlayerAchievementMethods.Result, methodName: this.Name, extraValue: suiStreak };
    },
  };

  static CatSunglasses = {
    Name: "CatSunglasses",
    DisplayedMsg: "Cool dude!",
    requireImage: () => require("../assets/awkwardstickers/Cat/CatSunglasses.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.selectedPersonHandshake.id === 27) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static CatSurprised = {
    Name: "CatSurprised",
    DisplayedMsg: "Whaaaat! you puched me!",
    requireImage: () => require("../assets/awkwardstickers/Cat/CatSurprised.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.selectedPersonHandshake.id === 25 && globalState.selectedPlayerHandshake.id == 3) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static CatProcessing = {
    Name: "CatProcessing",
    DisplayedMsg: "Whaaaat! you did it again!",
    requireImage: () => require("../assets/awkwardstickers/Cat/CatProcessing.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.selectedPersonHandshake.id === 25 && globalState.selectedPlayerHandshake.id == 3) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static CatTasleekSmile = {
    Name: "CatTasleekSmile",
    DisplayedMsg: "It's enough! Dont punch me again peasant",
    requireImage: () => require("../assets/awkwardstickers/Cat/CatTasleekSmile.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.selectedPersonHandshake.id === 25 && globalState.selectedPlayerHandshake.id == 3) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static Cat7BadInARow = {
    Name: "Cat7BadInARow",
    DisplayedMsg: "7 Unmatched handshakes in a row" + this.MultiLineSepeartor + "Whaaaat!",
    requireImage: () => require("../assets/awkwardstickers/Cat/Cat7BadInARow.png"),
    execute: function (param = PlayerAchievementMethods.Param) {
      let noMatchStreak = param.playerPersonAchievement.extraValue;
      if (globalState.selectedPersonHandshake.id !== globalState.selectedPlayerHandshake.id) {
        noMatchStreak += 1;
        if (noMatchStreak >= 7) {
          return {
            msg: this.DisplayedMsg,
            showAchievement: true,
            requireImage: this.requireImage,
            methodName: this.Name,
            extraValue: noMatchStreak,
          };
        }
      } else {
        noMatchStreak = 0;
      }
      return { ...PlayerAchievementMethods.Result, methodName: this.Name, extraValue: noMatchStreak };
    },
  };

  static DiCaprioDjangoLaugh = {
    Name: "DiCaprioDjangoLaugh",
    DisplayedMsg: "Hilarious!",
    requireImage: () => require("../assets/images/persons/DiCaprioHappy.png"),
    execute: (param) => MoodExecute(this.DiCaprioDjangoLaugh, param, PersonMood.HAPPY.value, 0),
  };

  static DiCaprioFiftyFifty = {
    Name: "DiCaprioFiftyFifty",
    DisplayedMsg: "👋 👋" + this.MultiLineSepeartor + "Fifty fifty!",
    requireImage: () => require("../assets/awkwardstickers/DiCaprio/DiCaprioFifty.gif"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.selectedPersonHandshake.id === 6 && globalState.selectedPlayerHandshake.id === 6) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static DiCaprioYouSlick = {
    Name: "DiCaprioYouSlick",
    DisplayedMsg: "Oh You!" + this.MultiLineSepeartor + "Exp: this handshake matches the hands in gif",
    requireImage: () => require("../assets/awkwardstickers/DiCaprio/DiCaprioYouSlick.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.selectedPersonHandshake.id === globalState.person.signatureHandshake.id && globalState.selectedPlayerHandshake.id === 6) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static DiCaprioShady = {
    Name: "DiCaprioShady",
    DisplayedMsg: "You didnt shake hands, you are acting shady!",
    requireImage: () => require("../assets/awkwardstickers/DiCaprio/DiCaprioShady.jpg"),
    execute: DidntPressShakeExecute,
  };

  static ElonPointing = {
    Name: "ElonPointing",
    DisplayedMsg: "Employee of the month!" + this.MultiLineSepeartor + "Exp: Elon's meter is happy and he's pointing",
    requireImage: () => require("../assets/awkwardstickers/Elon/ElonPointing.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      let meterValue = globalState.meter.meterValue;
      if (param.meterAddedValue + meterValue >= globalState.person.moodBreakpoints.NORMAL && globalState.selectedPersonHandshake.id === 18) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static ElonThisis = {
    Name: "ElonThisis",
    DisplayedMsg: "This is Elon Musk!" + this.MultiLineSepeartor + "Exp: You/Elon tried one thumbs up, and the other has two",
    requireImage: () => require("../assets/awkwardstickers/Elon/ElonThisis.gif"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (
        (globalState.selectedPersonHandshake.id === 19 && globalState.selectedPlayerHandshake.id === 5) ||
        (globalState.selectedPersonHandshake.id === 5 && globalState.selectedPlayerHandshake.id === 19)
      ) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static CenaBingChiling = {
    Name: "CenaBingChiling",
    DisplayedMsg: "I Hope your audio was up!",
    requireImage: () => require("../assets/awkwardstickers/Cena/CenaBingChiling.gif"),
    execute: (param) => MoodAudioExecute(this.CenaBingChiling, param, PersonMood.NORMAL.value, 0),
  };

  static CenaConfused = {
    Name: "CenaConfused",
    DisplayedMsg: "What handshake do you want!!!!!",
    requireImage: () => require("../assets/awkwardstickers/Cena/CenaConfused.gif"),
    execute: DidntPressShakeExecute,
  };

  static KhabyMax = {
    Name: "KhabyMax",
    DisplayedMsg: "Enough, Get out.",
    requireImage: () => require("../assets/awkwardstickers/Khaby/KhabyMax.gif"),
    execute: PersonHadEnoughExecute,
  };

  static KhabyConfused = {
    Name: "KhabyConfused",
    DisplayedMsg: "Its with two hands 🤲! not one ✋",
    requireImage: () => require("../assets/awkwardstickers/Khaby/KhabyConfused.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.selectedPersonHandshake.id === globalState.person.signatureHandshake.id && globalState.selectedPlayerHandshake.id === 1) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static MarkFist = {
    Name: "MarkFist",
    DisplayedMsg: "There you go friend",
    requireImage: () => require("../assets/awkwardstickers/Mark/MarkFist.gif"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.selectedPersonHandshake.id === 3 && globalState.selectedPlayerHandshake.id === 3) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static MarkBlink = {
    Name: "MarkBlink",
    DisplayedMsg: "Waiting for you... to leave!",
    requireImage: () => require("../assets/awkwardstickers/Mark/MarkBlink.gif"),
    execute: PersonHadEnoughExecute,
  };

  static MarkTiredSmile = {
    Name: "MarkTiredSmile",
    DisplayedMsg: "10 smiles with Mark!" + this.MultiLineSepeartor + "When the smiling will be over!",
    requireImage: () => require("../assets/awkwardstickers/Mark/MarkTiredSmile.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      let smileMatchStreak = param.playerPersonAchievement.extraValue;
      if (
        globalState.selectedPersonHandshake.id === globalState.person.signatureHandshake.id &&
        globalState.selectedPersonHandshake.id === globalState.selectedPlayerHandshake.id
      ) {
        smileMatchStreak += 1;
        if (smileMatchStreak >= 10) {
          return {
            msg: this.DisplayedMsg,
            showAchievement: true,
            requireImage: this.requireImage,
            methodName: this.Name,
            extraValue: smileMatchStreak,
          };
        }
      }
      return { ...PlayerAchievementMethods.Result, methodName: this.Name, extraValue: smileMatchStreak };
    },
  };

  static SpeedMaxPlayed = {
    Name: "SpeedMaxPlayed",
    DisplayedMsg: "Oh man!",
    requireImage: () => require("../assets/awkwardstickers/Speed/SpeedMaxPlayed.gif"),
    execute: PersonHadEnoughExecute,
  };

  static SpeedWakey = {
    Name: "SpeedWakey",
    DisplayedMsg: "hmmmm...",
    requireImage: () => require("../assets/awkwardstickers/Speed/SpeedWakey.jpg"),
    execute: DidntPressShakeExecute,
  };

  static SpeedWhat = {
    Name: "SpeedWhat",
    DisplayedMsg: "Punch Speed at first encounter!" + this.MultiLineSepeartor + "You brought Me to be humiliated from the very start!",
    requireImage: () => require("../assets/awkwardstickers/Speed/SpeedWhat.gif"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.timesPlayed <= 0 && globalState.selectedPlayerHandshake.id === 12) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static SpongeConfused = {
    Name: "SpongeConfused",
    DisplayedMsg: "Confusion! Patrick!",
    requireImage: () => require("../assets/awkwardstickers/SpongeBob/SpongeConfused.jpg"),
    execute: DidntPressShakeExecute,
  };

  static SpongeMax = {
    Name: "SpongeMax",
    DisplayedMsg: "IGHT",
    requireImage: () => require("../assets/awkwardstickers/SpongeBob/SpongeMax.jpg"),
    execute: PersonHadEnoughExecute,
  };

  static SpongeTired = {
    Name: "SpongeTired",
    DisplayedMsg: "100 HandShakes!" + this.MultiLineSepeartor + "My arms feeling spongy after that ;)",
    requireImage: () => require("../assets/awkwardstickers/SpongeBob/SpongeTired.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      let noMatchStreak = param.playerPersonAchievement.extraValue;
      noMatchStreak += 1;
      if (noMatchStreak >= 100) {
        return {
          msg: this.DisplayedMsg,
          showAchievement: true,
          requireImage: this.requireImage,
          methodName: this.Name,
          extraValue: noMatchStreak,
        };
      }
      return { ...PlayerAchievementMethods.Result, methodName: this.Name, extraValue: noMatchStreak };
    },
  };
  //#endregion
}

function signatureExecute(param = PlayerAchievementMethods.Param) {
  if (globalState.selectedPersonHandshake.id === globalState.person.signatureHandshake.id) {
    return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
  }
  return PlayerAchievementMethods.Result;
}
function hundredPercentExecute(param = PlayerAchievementMethods.Param) {
  let meterValue = globalState.meter.meterValue;
  if (param.meterAddedValue + meterValue >= globalState.person.moodBreakpoints.HAPPY) {
    return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
  }
  return PlayerAchievementMethods.Result;
}
function ZeroPercentExecute(param = PlayerAchievementMethods.Param) {
  let meterValue = globalState.meter.meterValue;
  if (
    param.meterAddedValue + meterValue <= globalState.person.moodBreakpoints.DEFAULT + 1 &&
    globalState.meter.meterValue !== globalState.person.moodBreakpoints.DEFAULT
  ) {
    return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
  }
  return PlayerAchievementMethods.Result;
}
function MoodAudioExecute(achievement, param = PlayerAchievementMethods.Param, value = -1, audioIndex = -1) {
  if (!param.newMood) return PlayerAchievementMethods.Result;
  const soundTimesPlayed = globalState.personMoodSoundCount[param.newMood.name].timesPlayed;
  const hasJustPlayed = globalState.personMoodSoundCount[param.newMood.name].hasJustPlayed;
  //if ((soundTimesPlayed < MaxTimesSoundPlayed && !hasJustPlayed) || globalState.timesPlayed >= MaxTimesPlayed) {
  if (!((soundTimesPlayed >= MaxTimesSoundPlayed || hasJustPlayed) && globalState.timesPlayed < MaxTimesPlayed)) {
    if (param.newMood.value === value && param.newMood.audioIndex === audioIndex) {
      return { msg: achievement.DisplayedMsg, showAchievement: true, requireImage: achievement.requireImage, methodName: achievement.Name };
    }
  }
  return PlayerAchievementMethods.Result;
}
function MoodExecute(achievement, param = PlayerAchievementMethods.Param, value = -1, imageIndex = -1) {
  if (!param.newMood) return PlayerAchievementMethods.Result;
  if (param.newMood.value === value && (imageIndex === param.newMood.imageIndex || imageIndex === -1)) {
    return { msg: achievement.DisplayedMsg, showAchievement: true, requireImage: achievement.requireImage, methodName: achievement.Name };
  }
  return PlayerAchievementMethods.Result;
}
function DidntPressShakeExecute(param = PlayerAchievementMethods.Param) {
  if (globalState.hasPressedShake === false) {
    return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
  }
  return PlayerAchievementMethods.Result;
}
function PersonHadEnoughExecute(param = PlayerAchievementMethods.Param) {
  let increaseTimesPlayedNum = globalState.selectedPersonHandshake.id !== globalState.selectedPlayerHandshake.id ? 2 : 1;
  if (globalState.timesPlayed + increaseTimesPlayedNum >= MaxTimesPlayed) {
    return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
  }
  return PlayerAchievementMethods.Result;
}
export { PlayerAchievementMethods };
