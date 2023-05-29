import { useEffect, useState } from "react"

const Card = (props) => {
    const [cardBottom, setCardBottom] = useState(0)
    const [active, setActive] = useState(false)

    console.log(`${props.card.card+props.card.suit}${cardBottom}`)

    const handleCardClick = (e) => {
        setActive(!active)
    }

    useEffect(() => {
        active ? setCardBottom(10) : setCardBottom(0)
        // add or remove card ID to active cards array, readying card to be swapped
        active ? props.setActiveCards([...props.activeCards, props.id]) : props.setActiveCards(props.activeCards.filter(activeId => props.id !== activeId))
    },[active])

    return(<>
        <button className={`ease-in-out duration-500 mb-${cardBottom}`}>
            <img onClick={handleCardClick} className={`bg -green-500  mr-5 shadow-card rounded-xl`} src={props.card.image} alt={props.card.card+props.card.suit}/>
        </button>
        </>)
}

export default Card