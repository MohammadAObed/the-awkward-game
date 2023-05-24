import handshakes from "../data/Handshake";
import { Handshake } from "../models/Handshake";
import { Person } from "../models/Person";
import persons from "../data/Person";
import { getRandomNumber } from "../utils/common/getRandomNumber";

export const initialState = {
  initialPerson: persons[getRandomNumber(persons.length)] || new Person(),
  initialHandshake: handshakes[0] || new Handshake(),
  initialPersonHandshake:
    handshakes[getRandomNumber(handshakes.length)] || new Handshake(),
};
