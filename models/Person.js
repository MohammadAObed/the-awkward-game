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
  constructor(Happy, Angry) {
    this.Happy = Happy;
    this.Angry = Angry;
  }
}

export { PersonImages, Person };
