const functions = [];

export const CalculateScore = (cardHand) => {

    // const sortableHand = cardHand
    const sortableHand = cardHand?.map(c => c)
    const sortedHand = sortableHand?.sort((a, b) => {
      return a.value - b.value
    })
  
    const cardCount = sortedHand?.reduce((tally, card) => {
      tally[card.value] = (tally[card.value] || 0) + 1;
      return tally;
    }, {});

    const getObjectKey = (obj, value) => {
        return Object.keys(obj).find(key => obj[key] === value)
      }

    functions.forEach(f => {
        score = f(sortedHand, cardCount)
        if (score) return
        else return parseInt(sortedHand[4].value);
    });

}
  

const royalFlush = (sortedHand, cardCount) => {
    if (
      sortedHand.filter((card) => card.suit === sortedHand[0].suit)
        .length === 5 &&
      sortedHand[0]?.value + 4 === sortedHand[4]?.value && 
      sortedHand[0]?.value === 10
    ) {
      return 700 + parseInt(sortedHand[0].value);
    }
}

const straightFlush = (sortedHand, cardCount) => { 
    //Straight Flush
    if (
      (sortedHand.filter((card) => card.suit === sortedHand[0].suit)
        .length === 5) &&
      (sortedHand[0]?.value + 4 === sortedHand[4]?.value)
    ) {
      return 600 + parseInt(sortedHand[0].value);
    }
  
    //Four of a kind
    if (Object?.values(cardCount).includes(4)) {
      return 500 + parseInt(getObjectKey(cardCount, 4));
    }
}
  
      //Full house
  
      //Flush
const flush = (sortedHand, cardCount) => { 
      if (sortedHand.filter(card => card.suit === sortedHand[0].suit).length === 5) {
        return 400 + parseInt(sortedHand[0].value);
      }
    }
      //Straight
const straight = (sortedHand, cardCount) => { 
      if ((sortedHand[0]?.value + 4) === (sortedHand[4]?.value)){
        return 300 + parseInt(sortedHand[0].value);
      }
    }
      // Three of a kind
const threeOfKind = (sortedHand, cardCount) => { 
      if (Object?.values(cardCount).includes(3)) {
        return 200 + parseInt(getObjectKey(cardCount, 3));
      }
    } 
      // Two Pair
      
      // Pair
const pair = (sortedHand, cardCount) => { 
      if (Object?.values(cardCount).includes(2)) {
        return 100 + parseInt(getObjectKey(cardCount, 2));
      }
}  
      return parseInt(sortedHand[4].value);
      // High Card
    

functions.push(royalFlush, straightFlush, flush, straight, threeOfKind, pair)
    
  
