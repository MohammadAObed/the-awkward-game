export class Common {
  constructor() {}
  //we added serialze method because we cant store a class object in redux or local storage unfortunaly
  serialize() {
    const serializedObj = {};
    const keys = Object.keys(this);
    keys.forEach((key, index) => {
      serializedObj[key] = this[key];
    });
    return serializedObj;
  }
}
