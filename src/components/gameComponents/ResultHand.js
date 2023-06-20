import Card from "../cards/Card";
import { useState, useEffect } from "react";
import { InlineLoading } from "../misc/Loading";
import ResultCard from "../cards/ResultCard";

const ResultHand = (props) => {

  return (
    <div className="flex">
      {props?.cards?.map((card) => (
        <div key={card.card + card.suit}>
          <ResultCard src={card.image} alt={card.card + card.suit} />
        </div>
      ))}
    </div>
  );
};

export default ResultHand;
