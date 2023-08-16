import { Person } from "../models/Person";

export const globalState = {
  navigation: {},
  dispatch: function () {},
  showWalkthrough: false,
  startWalkthrough: function () {},
  modalVisible: false,
  showModal: function () {},
  hideModal: function () {},
  person: new Person(),
  setPerson: function () {},
  showHelpModal: function () {},
};
export const nGlobalState = {
  navigation: "navigation",
  dispatch: "dispatch",
  showWalkthrough: "showWalkthrough",
  startWalkthrough: "startWalkthrough",
  modalVisible: "modalVisible",
  showModal: "showModal",
  hideModal: "hideModal",
  person: "person",
  setPerson: "setPerson",
};
