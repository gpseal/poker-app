import Card from "./cards/Card";

const ResultHand = (props) => {
  return (
    <div className="flex">
      {props?.cards?.map((card) => (
        <img
          className="sm:w-20 lg:w-40 w-[20%] px-1 sm:px-2"
          src={card.image}
          alt={card.card + card.suit}
        />
      ))}
    </div>
  );
};

export default ResultHand;
