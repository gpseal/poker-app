import { useEffect, useState } from "react"

const Card = (props) => {
    const [cardBottom, setCardBottom] = useState(0)
    const [cardTop, setCardTop] = useState(20)
    const [active, setActive] = useState(false)

    const handleCardClick = (e) => {
        setActive(!active)
    }

    useEffect(() => {
        // add or remove card ID to active cards array, readying card to be swapped
        active ? props.setActiveCards([...props.activeCards, props.id]) : props.setActiveCards(props.activeCards.filter(activeId => props.id !== activeId))
        active ? setCardBottom(10) : setCardBottom(0)
        active ? setCardTop(0) : setCardTop(10)
    },[active])

    useEffect(() => {
        setActive(false)
    },[props.card])

    return(<>
        <div className={`bg-green-100`}>
            <img onClick={handleCardClick} className={`ease-in-out duration-500 mr-5 shadow-card rounded-xl cursor-pointer mt-${cardTop}`} src={props.card.image} alt={props.card.card+props.card.suit}/>
        </div>
        </>)
}

export default Card