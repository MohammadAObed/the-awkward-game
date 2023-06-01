import { createSlice } from "@reduxjs/toolkit";
import { PersonMeter } from "../models/PersonMeter";
import persons from "../data/Person";
import { MeterReset, MeterUpdate } from "../controllers/PersonMeterController";
//containing all items
export const initialState = {
  meters: [
    new PersonMeter(1, persons[0], persons[0].moodBreakpoints.DEFAULT).serialize(),
    new PersonMeter(2, persons[1], persons[1].moodBreakpoints.DEFAULT).serialize(),
    new PersonMeter(3, persons[2], persons[2].moodBreakpoints.DEFAULT).serialize(),
  ],
};

export const PersonMeterSlice = createSlice({
  name: "meter",
  initialState,
  reducers: {
    meterUpdate: (state, action) => MeterUpdate(state, action),
    meterReset: (state, action) => MeterReset(state, action, initialState),
  },
});

export const selectMeters = (state) => {
  return state.meter.meters;
};

export const selectMeterByPersonId = (state, personId) => {
  return state.meter.meters.find((item) => item.personId === personId) || new PersonMeter();
};

export const { meterUpdate, meterReset } = PersonMeterSlice.actions;

export default PersonMeterSlice.reducer;
