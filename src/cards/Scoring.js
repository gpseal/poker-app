
export const CalculateScoreNew = (cardHand) => {

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
  for (let index = 0; index < functions.length; index++) {
    const f = functions[index];
    const score = f(sortedHand, cardCount, getObjectKey)
    if (score) {
      return score
    }
  }
  return parseInt(sortedHand[4].value);
}
  
const functions = [];

const royalFlush = (sortedHand, cardCount, getObjectKey) => {
  if (
    sortedHand?.filter((card) => card.suit === sortedHand[0].suit)
      .length === 5 &&
    sortedHand[0]?.value + 4 === sortedHand[4]?.value && 
    sortedHand[0]?.value === 10
  ) {
    return 900 + parseInt(sortedHand[0].value);
  }
}

const straightFlush = (sortedHand, cardCount, getObjectKey) => { 
  if (
    (sortedHand.filter((card) => card.suit === sortedHand[0].suit)
      .length === 5) &&
    (sortedHand[0]?.value + 4 === sortedHand[4]?.value)
  ) {
    return 800 + parseInt(sortedHand[0].value);
  }
}

const fourOfAKind = (sortedHand, cardCount, getObjectKey) => {
  if (Object?.values(cardCount).includes(4)) {
    return 700 + parseInt(getObjectKey(cardCount, 4));
  }
}

const fullHouse = (sortedHand, cardCount, getObjectKey) => { 
  if ((Object?.values(cardCount).includes(2)) && (Object?.values(cardCount).includes(3))) {
    console.log("here")
    return 600 + parseInt(sortedHand[0].value)
  }
}

const flush = (sortedHand, cardCount, getObjectKey) => { 
  if (sortedHand.filter(card => card.suit === sortedHand[0].suit).length === 5) {
    return 500 + parseInt(sortedHand[0].value);
  }
}

const straight = (sortedHand, cardCount, getObjectKey) => { 
  if ((sortedHand[0]?.value + 4) === (sortedHand[4]?.value)){
    return 400 + parseInt(sortedHand[0].value);
  }
}

const threeOfKind = (sortedHand, cardCount, getObjectKey) => { 
  if (Object?.values(cardCount).includes(3)) {
    return 300 + parseInt(getObjectKey(cardCount, 3));
  }
}

const twoPairs = (sortedHand, cardCount, getObjectKey) => {
  if (Object?.values(cardCount).includes(2) && Object?.values(cardCount).length === 3) {
    return 200 + parseInt(getObjectKey(cardCount, 2));
  }
}

const pair = (sortedHand, cardCount, getObjectKey) => { 
  if (Object?.values(cardCount).includes(2)) {
    return 100 + parseInt(getObjectKey(cardCount, 2));
  }
}

functions.push(royalFlush, straightFlush, fourOfAKind, fullHouse, flush, straight, threeOfKind, twoPairs, pair)
    
  
