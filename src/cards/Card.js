import { useEffect, useState } from "react"

const Card = (props) => {
    const [cardBottom, setCardBottom] = useState(0)
    const [cardTop, setCardTop] = useState(20)
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
    // console.log(cardLoaded)

    useEffect(() => {
        // add or remove card ID to active cards array, readying card to be swapped
        active ? props.setActiveCards([...props.activeCards, props.cardId]) : props.setActiveCards(props.activeCards.filter(activeId => props.cardId !== activeId))
        active ? setCardBottom(10) : setCardBottom(0)
        active ? setCardTop(0) : setCardTop(10)
    },[active])

    useEffect(() => {
        setActive(false)
    },[props.card])

    return(<>
        <div className={`bg-green-600 w-48 h-[315px] mr-5`}>
            <img onClick={handleCardClick} onLoad={cardLoad}
                className={`ease-in-out duration-500  shadow-card rounded-xl cursor-pointer mt-${cardTop} ${cardLoaded ? "visible" : "invisible"}`} 
                src={props.card.image} alt={props.card.card+props.card.suit}/>
            {!cardLoaded && <div className="w-48 h-[315px]">Loading</div>}
        </div>
        </>)
}

export default Card