import React, { useState } from "react";
import { personHandshakeAnimationValues, playerHandshakeAnimationValues } from "../../constants/GameScreen";
import { PlayerType } from "../../constants/PlayerType";
import { globalState, nGlobalState } from "../../global/GameScreen";
import { generateRandomHandshake } from "../../helpers/GameScreen";
import useGlobalState from "../../hooks/common/useGlobalState";
import useAnimatedHandshake from "../../hooks/GameScreen/useAnimatedHandshake";
import { initialState } from "../../initials/GameScreen";
import MovingHandshakeComponent from "./MovingHandshakeComponent";

const MovingHandshakesComponent = () => {
  initialState.initialPersonHandshake = generateRandomHandshake({ person: initialState.initialPerson }) || initialState.initialHandshake;

  useGlobalState(
    globalState,
    useState,
    [initialState.initialHandshake],
    nGlobalState.selectedPlayerHandshake,
    nGlobalState.setSelectedPlayerHandshake
  );
  useGlobalState(
    globalState,
    useState,
    [initialState.initialPersonHandshake],
    nGlobalState.selectedPersonHandshake,
    nGlobalState.setSelectedPersonHandshake
  );
  const personHandshakeAnimation = useAnimatedHandshake(PlayerType.PERSON, personHandshakeAnimationValues);
  const playerHandshakeAnimation = useAnimatedHandshake(PlayerType.PLAYER, playerHandshakeAnimationValues);
  globalState.personHandshakeAnimation = personHandshakeAnimation;
  globalState.playerHandshakeAnimation = playerHandshakeAnimation;
  return (
    <>
      <MovingHandshakeComponent playerType={PlayerType.PERSON} />
      <MovingHandshakeComponent playerType={PlayerType.PLAYER} />
    </>
  );
};

export default MovingHandshakesComponent;
