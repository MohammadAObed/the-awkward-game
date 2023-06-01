import { Common } from "./Common";
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

export { PlayerAchievement };
