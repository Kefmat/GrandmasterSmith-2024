import React from "react";
import ReactDOM from "react-dom";
import BotTestApp from "./BotTestApp";
import bots from "./bots";

const BotTestIndex = () => {
  return (
    <BotTestApp
      bots={bots}
      onGameCompleted={(winner) => {
        global.alert(
          `${
            winner === "b" ? "Black" : winner === "w" ? "White" : "No one"
          } is the winner!`
        );
      }}
    />
  );
};

export default BotTestIndex;
