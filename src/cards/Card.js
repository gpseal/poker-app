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
        active ? setCardBottom(20) : setCardBottom(0)
        active ? setCardTop(0) : setCardTop(20)
    },[active])

    useEffect(() => {
        console.log(props.card)
        setActive(false)
    },[props.card])

    return(<>
        <div className={`ease-in-out duration-500 bg-green-100`}>
            <img onClick={handleCardClick} className={`mr-5 shadow-card rounded-xl mt-${cardTop} mb-20`} src={props.card.image} alt={props.card.card+props.card.suit}/>
        </div>
        </>)
}

export default Card