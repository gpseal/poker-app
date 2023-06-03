import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


const Card = (props) => {
    const [cardBottom, setCardBottom] = useState(0)
    const [cardTop, setCardTop] = useState(10)
    const [cardTopRef, setCardTopRef] = useState(10)
    const [active, setActive] = useState(false)
    const [cardLoaded, setCardLoaded] = useState(false)

    const handleCardClick = (e) => {
        setActive(!active)
    }

    const cardLoad = () => {
        // console.log("object")
        setCardLoaded(true)
        return
    }
    
    useEffect(() => {
        // add or remove card ID to active cards array, readying card to be swapped
        active ? props.setActiveCards([...props.activeCards, props.cardId]) : props.setActiveCards(props.activeCards.filter(activeId => props.cardId !== activeId))
        active ? setCardTop(0) : setCardTop(10)
        active ? setCardTopRef(0) : setCardTopRef(15);
        console.log(cardTopRef);
    },[active])

    useEffect(() => {
        setActive(false)
    },[props.card])
    
    return (
      <>
        <div className={` w-48 h-[315px] mr-5 `}>
          <img
            onClick={handleCardClick}
            onLoad={cardLoad}
            className={`z-20 ease-in-out duration-500 rounded-xl cursor-pointer mt-${cardTop} ${
              cardLoaded ? "visible" : "invisible"
            }`}
            src={props.card.image}
            alt={props.card.card + props.card.suit}
          />
          <div className="w-48 h-[360px] absolute z-10 bg-gradient-to-t from-back from-40% "></div>
          <img
            onLoad={cardLoad}
            className={`z-10 ease-in-out duration-500 rounded-xl cursor-pointer opacity-20 ${
              active ? "pt-20" : "pt-0"
            } ${cardLoaded ? "visible" : "invisible"}`}
            src={props.card.image}
            alt={props.card.card + props.card.suit}
          />
          {!cardLoaded && (
            <div className="w-48 h-[315px] flex justify-center items-center">
                Loading
              <FontAwesomeIcon icon={faSpinner} spin size="2xl" />
            </div>
          )}
        </div>
      </>
    );
}

export default Card