const URLBase= "https://tekeye.uk/playing_cards/images/svg_playing_cards/fronts/"

const deck = [];
const suits = ["spades", "hearts", "clubs", "diamonds"]
const cards = ["2","3","4","5","6","7","8","9","10","jack","queen","king","ace"]
const values = [2,3,4,5,6,7,8,9,10,11,12,13,14]

suits.forEach(suit => cards.forEach((card, i) =>{
    deck.push(
            {
                suit: suit,
                card: card,
                value: values[i],
                image: `${URLBase}${suit}_${card}.svg`,
            }
        )
}));


export default deck;