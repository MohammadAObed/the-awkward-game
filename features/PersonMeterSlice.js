import { createSlice } from "@reduxjs/toolkit";
import { PersonMeter } from "../models/PersonMeter";
import persons from "../data/Person";
import { MeterReset, MeterUpdate } from "../controllers/PersonMeterController";
//containing all items
export const initialState = {
  meters: persons.map((p, index) => new PersonMeter(index + 1, p, p.moodBreakpoints.DEFAULT).serialize()),
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
