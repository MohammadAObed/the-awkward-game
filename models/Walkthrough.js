import { Common } from "./Common";

class Walkthrough extends Common {
  constructor(screenName = "", listOrder = 1, show = true) {
    super();
    this.screenName = screenName;
    this.listOrder = listOrder;
    this.show = show;
  }
}
export { Walkthrough };
