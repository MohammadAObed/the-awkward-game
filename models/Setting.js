import { Common } from "./Common";

const SettingsNames = {
  AiVoice: "AiVoice",
  Reached100AchievmentsHidden: "Reached100AchievmentsHidden",
  timerSound: "timerSound",
};

class Setting extends Common {
  constructor(id = 1, name = "", value = null) {
    super();
    this.id = id;
    this.name = name;
    this.value = value;
  }
}

export { Setting, SettingsNames };
