const URLBase= "https://deckofcardsapi.com/static/img/"

class Card {
    constructor(suit, card, value) {
        this.suit = suit;
        this.card = card;
        this.value = value;
    }
    getImage() {
        return `${URLBase}${this.card}${this.suit}.png`
    }
}

const deck = [];
const suits = ["S", "H", "C", "D"]
const cards = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]
const values = [2,3,4,5,6,7,8,9,10,11,12,13,14]

suits.forEach(suit => cards.forEach((card, i) =>{
    deck.push(
            {
                suit: suit,
                card: card,
                value: values[i],
                image: `${URLBase}${card}${suit}.png`,
            }
        )
}));


export default deck;