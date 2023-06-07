import Card from "../cards/Card";

const ResultHand = (props) => {
  return (
    <div className="flex">
      {props?.cards?.map((card) => (
        <img
          className="w-32 px-2"
          src={card.image}
          alt={card.card + card.suit}
        />
      ))}
    </div>
  );
};

export default ResultHand;
