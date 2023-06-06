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
  };

  //#region Methods
  static TheEyebrow = {
    Name: "TheEyebrow",
    DisplayedMsg: "Something's cooking and its suspecious 🤨",

    execute: function (param = PlayerAchievementMethods.Param) {
      if (param.selectedPersonHandshake.id === param.person.signatureHandshake.id) {
        return { msg: this.DisplayedMsg, showAchievement: true };
      }
      return PlayerAchievementMethods.Result;
    },
  };
  //#endregion
}

export { PlayerAchievement, PlayerAchievementMethods };
