import { PersonMood } from "../constants/Person";
import { globalState } from "../global/GameScreen";
import { PlayerAchievement } from "./PlayerAchievement";

class PlayerAchievementMethods {
  static Param = {
    playerPersonAchievement: new PlayerAchievement(),
  };
  static Result = {
    msg: "",
    showAchievement: false,
    requireImage: null,
    methodName: "",
  };

  //#region Methods
  static TheEyebrow = {
    Name: "TheEyebrow",
    DisplayedMsg: "The Sus Detector 🤨",
    requireImage: () => require("../assets/awkwardstickers/TheEyebrow.gif"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.selectedPersonHandshake.id === globalState.person.signatureHandshake.id) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };
  static DiCaprioDjangoLaugh = {
    Name: "DiCaprioDjangoLaugh",
    DisplayedMsg: "Is Reqaaired",
    requireImage: () => require("../assets/images/persons/DiCaprioHappy.png"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (
        (globalState.personMood.value === PersonMood.NORMAL.value || globalState.personMood.value === PersonMood.HAPPY.value) &&
        globalState.selectedPersonHandshake.id === globalState.selectedPlayerHandshake.id &&
        globalState.selectedPersonHandshake.id !== globalState.person.signatureHandshake.id
      ) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };
  //#endregion
}
export { PlayerAchievementMethods };
