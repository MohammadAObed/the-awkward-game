import { PersonMood } from "../constants/Person";

class PersonMeetUpLines {
  constructor(personId = 1, Happy = () => [], Normal = () => [], Angry = () => [], Signature = () => []) {
    this.personId = personId;
    this[PersonMood.HAPPY.name] = Happy;
    this[PersonMood.ANGRY.name] = Angry;
    this[PersonMood.NORMAL.name] = Normal;
  }
}

export { PersonMeetUpLines };
