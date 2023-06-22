import { CalculateScore } from "./Scoring";

const checkWinner = (hand1, hand2) => {
    const scoreHand1 = CalculateScore(hand1)
    const scoreHand2 = CalculateScore(hand2)
    if (scoreHand1.score > scoreHand2.score){
        return "hand 1 wins"
    }
    else return "hand 2 wins"
}

describe("test Scoring", () => {

    let hand1 = [{
        value: 3,
        suit:"diamonds"
    }, 
    {
        value: 5,
        suit:"spades"
    },
    {
        value: 6,
        suit:"clubs"
    },
    {
        value: 7,
        suit:"hearts"
    },
    {
        value: 9,
        suit:"clubs"
    }];

    let hand2 = [{
        value: 3,
        suit:"diamonds"
    }, 
    {
        value: 5,
        suit:"clubs"
    },
    {
        value: 6,
        suit:"hearts"
    },
    {
        value: 7,
        suit:"clubs"
    },
    {
        value: 8,
        suit:"spades"
    }];

    it("tests for HIGH CARD, highest HIGH CARD wins", () => {
        expect(CalculateScore(hand1).handName).toBe("High Card")
        expect(checkWinner(hand1, hand2)).toBe("hand 1 wins")
    })

    it("tests for PAIR, PAIR beats HIGH CARD", () => {
        hand1[1].value=3
        expect(CalculateScore(hand1).handName).toBe("Pair")
        expect(checkWinner(hand1, hand2)).toBe("hand 1 wins")
    })

    it("tests for 2 PAIR, 2 PAIR beats PAIR", () => {
        hand1[0].value=3
        hand1[1].value=3
        hand1[2].value=6
        hand1[3].value=6

        hand2[0].value=4
        hand2[1].value=4

        expect(CalculateScore(hand1).handName).toBe("2 Pair")
        expect(checkWinner(hand1, hand2)).toBe("hand 1 wins")
    })

    it("tests for 3 OF A KIND, 3 OF A KIND beats 2 PAIR", () => {
        hand1[0].value=3
        hand1[1].value=3
        hand1[2].value=3

        hand2[0].value=2
        hand2[1].value=2
        hand2[2].value=6
        hand2[3].value=6

        expect(CalculateScore(hand1).handName).toBe("3 of a Kind")
        expect(checkWinner(hand1, hand2)).toBe("hand 1 wins")
    })

    it("tests for STRAIGHT, STRAIGHT beats 3 OF A KIND", () => {
        hand1[0].value=2
        hand1[1].value=3
        hand1[2].value=4
        hand1[3].value=5
        hand1[4].value=6

        hand2[0].value=3
        hand2[1].value=3
        hand2[2].value=3

        expect(CalculateScore(hand1).handName).toBe("Straight")
        expect(checkWinner(hand1, hand2)).toBe("hand 1 wins")
    })
    
    it("tests for FLUSH, FLUSH beats STRAIGHT", () => {
        hand1[0] = {value: 2, suit: "clubs"}
        hand1[1] = {value: 8, suit: "clubs"}
        hand1[2] = {value: 7, suit: "clubs"}
        hand1[3] = {value: 9, suit: "clubs"}
        hand1[4] = {value: 6, suit: "clubs"}

        hand2[0].value=2
        hand2[1].value=3
        hand2[2].value=4
        hand2[3].value=5
        hand2[4].value=6

        expect(CalculateScore(hand1).handName).toBe("Flush")
        expect(checkWinner(hand1, hand2)).toBe("hand 1 wins")
    })
    
    it("tests for FULL HOUSE, FULL HOUSE beats FLUSH", () => {
        hand1[0] = {value: 2, suit: "diamonds"}
        hand1[1] = {value: 2, suit: "clubs"}
        hand1[2] = {value: 2, suit: "spades"}
        hand1[3] = {value: 3, suit: "hearts"}
        hand1[4] = {value: 3, suit: "clubs"}

        hand2[0] = {value: 2, suit: "clubs"}
        hand2[1] = {value: 8, suit: "clubs"}
        hand2[2] = {value: 7, suit: "clubs"}
        hand2[3] = {value: 9, suit: "clubs"}
        hand2[4] = {value: 6, suit: "clubs"}

        expect(CalculateScore(hand1).handName).toBe("Full House")
        expect(checkWinner(hand1, hand2)).toBe("hand 1 wins")
    })
    
    it("tests for 4 OF A KIND, 4 OF A KIND beats FULL HOUSE", () => {
        hand1[0].value=2
        hand1[1].value=2
        hand1[2].value=2
        hand1[3].value=2
        hand1[4].value=4

        hand2[0] = {value: 2, suit: "diamonds"}
        hand2[1] = {value: 2, suit: "clubs"}
        hand2[2] = {value: 2, suit: "spades"}
        hand2[3] = {value: 3, suit: "hearts"}
        hand2[4] = {value: 3, suit: "clubs"}

        expect(CalculateScore(hand1).handName).toBe("4 of a Kind")
        expect(checkWinner(hand1, hand2)).toBe("hand 1 wins")
    })
    
    it("tests for STRAIGHT FLUSH, STRAIGHT FLUSH beats 4 OF A KIND", () => {
        hand1[0] = {value: 2, suit: "clubs"}
        hand1[1] = {value: 3, suit: "clubs"}
        hand1[2] = {value: 4, suit: "clubs"}
        hand1[3] = {value: 5, suit: "clubs"}
        hand1[4] = {value: 6, suit: "clubs"}

        hand2[0].value=2
        hand2[1].value=2
        hand2[2].value=2
        hand2[3].value=2
        hand2[4].value=4

        expect(CalculateScore(hand1).handName).toBe("Straight Flush")
        expect(checkWinner(hand1, hand2)).toBe("hand 1 wins")
    })

    it("tests for ROYAL FLUSH, ROYAL FLUSH beats STRAIGHT FLUSH", () => {
        hand1[0] = {value: 10, suit: "clubs"}
        hand1[1] = {value: 11, suit: "clubs"}
        hand1[2] = {value: 12, suit: "clubs"}
        hand1[3] = {value: 13, suit: "clubs"}
        hand1[4] = {value: 14, suit: "clubs"}

        hand2[0] = {value: 2, suit: "clubs"}
        hand2[1] = {value: 3, suit: "clubs"}
        hand2[2] = {value: 4, suit: "clubs"}
        hand2[3] = {value: 5, suit: "clubs"}
        hand2[4] = {value: 6, suit: "clubs"}

        expect(CalculateScore(hand1).handName).toBe("Royal Flush")
        expect(checkWinner(hand1, hand2)).toBe("hand 1 wins")
    })
})
