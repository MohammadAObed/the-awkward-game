export class Common {
  constructor() {}
  //we added serialze method because we cant store a class object in redux or local storage unfortunaly
  serialize(exclude = []) {
    const serializedObj = {};
    for (const key in this) {
      if (exclude.includes(key)) continue;
      serializedObj[key] = this[key];
    }
    return serializedObj;
  }
}
