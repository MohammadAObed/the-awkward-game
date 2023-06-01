import { Common } from "./Common";
import { Person } from "./Person";

class PersonMeter extends Common {
  constructor(id = 1, person = new Person(), meterValue = 50) {
    super();
    this.id = id;
    this.personId = person.id;
    this.meterValue = meterValue;
  }
}

export { PersonMeter };
