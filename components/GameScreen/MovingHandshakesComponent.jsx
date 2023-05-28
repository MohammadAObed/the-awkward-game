import React, { useState } from "react";
import useGlobalState from "../../hooks/common/useGlobalState";
import { globalState, nGlobalState } from "../../global/GameScreen";
import { PlayerType } from "../../constants/PlayerType";
import { personHandshakeAnimationValues, playerHandshakeAnimationValues } from "../../constants/GameScreen";
import MovingHandshakeComponent from "./MovingHandshakeComponent";
import { initialState } from "../../initials/GameScreen";

const MovingHandshakesComponent = () => {
  useGlobalState(globalState, useState, [initialState.initialHandshake], nGlobalState.selectedHandshake, nGlobalState.setSelectedHandshake);
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
