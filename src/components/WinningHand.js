import Card from "../cards/Card";

const WinningHand = (props) => {
    return (
      <>
        {props?.cards?.map((card, index) => (
          <img className="w-32 px-2"
            src={card.image}
            alt={card.card + card.suit}
          />
        ))}
      </>
    );
}

export default WinningHand