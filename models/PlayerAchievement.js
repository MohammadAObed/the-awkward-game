import { Common } from "./Common";
import { Handshake } from "./Handshake";
import { Person } from "./Person";

class PlayerAchievement extends Common {
  constructor(id = 1, person = new Person(), methodName = "") {
    super();
    this.id = id;
    this.personId = person.id;
    this.methodName = methodName;
    this.hasUnlocked = false;
  }
}

class PlayerAchievementMethods {
  static Param = {
    selectedPersonHandshake: new Handshake(),
    selectedPlayerHandshake: new Handshake(),
    person: new Person(),
    playerPersonAchievementList: [new PlayerAchievement()],
    playerPersonAchievement: new PlayerAchievement(),
  };
  static Result = {
    msg: "",
    showAchievement: false,
    image: null,
    methodName: "",
  };

  //#region Methods
  static TheEyebrow = {
    Name: "TheEyebrow",
    DisplayedMsg: "The Sus Detector 🤨",
    image: require("../assets/awkwardstickers/TheEyebrow.gif"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (param.selectedPersonHandshake.id === param.person.signatureHandshake.id) {
        return { msg: this.DisplayedMsg, showAchievement: true, image: this.image, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };
  //#endregion
}

export { PlayerAchievement, PlayerAchievementMethods };
