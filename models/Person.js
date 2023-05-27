class Person {
  constructor(id = 1, name = "", images = new PersonImages(), signatureLine = "", lines = [""]) {
    this.id = id;
    this.name = name;
    this.images = images;
    this.signatureLine = signatureLine;
    this.lines = lines;
  }
}

class PersonImages {
  constructor(Happy, Angry, Normal) {
    this.Happy = Happy;
    this.Angry = Angry;
    this.Normal = Normal;
  }
}

export { PersonImages, Person };
