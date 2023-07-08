import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { WalkthroughStep, walkthroughable } from "../../libraries/walkthrough";
import { Person } from "../../models/Person";
import { useDispatch, useSelector } from "react-redux";
import { meterReset, selectMeterByPersonId } from "../../features/PersonMeterSlice";
import { PersonMeter } from "../../models/PersonMeter";

const WalkthroughView = walkthroughable(View);

const extraDisplayedWidth = 1.2;

const PersonBarWalkthroughComponent = ({ isWalkthrough = false, person = new Person() }) => {
  return (
    <>
      {isWalkthrough ? (
        <WalkthroughStep text={`Bar indicates how much you're friends with ${person.name}`} order={2} name="Second">
          <WalkthroughView>
            <PersonBarComponent person={person} />
          </WalkthroughView>
        </WalkthroughStep>
      ) : (
        <PersonBarComponent person={person} />
      )}
    </>
  );
};

const PersonBarComponent = ({ person = new Person() }) => {
  let meter = new PersonMeter();

  meter = useSelector((state) => selectMeterByPersonId(state, person.id));
  return (
    <View className="h-2.5 border border-black-700 overflow-hidden" style={{ width: 100 * extraDisplayedWidth }}>
      <View className="bg-yellow-500 h-full" style={{ width: meter.meterValue * extraDisplayedWidth }}></View>
    </View>
  );
};

export default PersonBarWalkthroughComponent;
