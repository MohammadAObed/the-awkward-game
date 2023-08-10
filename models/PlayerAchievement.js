import { Common } from "./Common";
import { Handshake } from "./Handshake";
import { Person } from "./Person";

class PlayerAchievement extends Common {
  constructor(id = 1, person = new Person(), methodName = "", extraValue = null) {
    super();
    this.id = id;
    this.personId = person.id;
    this.methodName = methodName;
    this.hasUnlocked = false;
    this.extraValue = extraValue;
  }
}

export { PlayerAchievement };
