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
        suit:"clubs"
    },
    {
        value: 6,
        suit:"clubs"
    },
    {
        value: 7,
        suit:"clubs"
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
        suit:"clubs"
    },
    {
        value: 7,
        suit:"clubs"
    },
    {
        value: 8,
        suit:"clubs"
    }];

    it("tests for High Card", () => {
        expect(CalculateScore(hand1).handName).toBe("High Card")
        expect(checkWinner(hand1, hand2)).toBe("hand 1 wins")
    })

    it("tests for pair", () => {
        hand1[1].value=3
        expect(CalculateScore(hand1).handName).toBe("Pair")
        expect(checkWinner(hand1, hand2)).toBe("hand 1 wins")
    })

    it("tests for pair", () => {
        hand1[2].value=3
        expect(CalculateScore(hand1).handName).toBe("3 of a Kind")
    })

})
