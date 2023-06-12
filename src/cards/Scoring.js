
export const CalculateScore = (cardHand) => {

  const sortableHand = cardHand?.map(c => c)
  const sortedHand = sortableHand?.sort((a, b) => {
    return  b.value - a.value
  })
  
  const findMatchingCards = sortedHand?.reduce((tally, card) => {
    tally[card.value] = (tally[card.value] || 0) + 1;
    return tally;
  }, {});
  
  const getObjectKey = (obj, value) => {
    return Object.keys(obj).find(key => obj[key] === value)
  }

  console.log(findMatchingCards)
  console.log(Object?.values(findMatchingCards))

  for (let index = 0; index < functions.length; index++) {
    const f = functions[index];
    const score = f(sortedHand, findMatchingCards, getObjectKey)
    if (score) {
      return score
    }
  }
  return addCardValues(sortedHand);
}

// https://www.tutorialspoint.com/sorting-only-a-part-of-an-array-javascript
// if there are matching cards in they should stay at the front of the array, only remaining cards should be sorted
const sortUnmatchingCards = (cards, start, end) => {
  const unmatching = cards.splice(start, end - start + 1)
  unmatching.sort(function(a, b){return b-a});
  cards.splice(start, 0, ...unmatching)
}

const addCardValues = (cards) => {
  let total= 0;
  let multiplier = 10000
  for (let i = 0; i < cards.length; i++) {
    total = total + (cards[i] * multiplier)
    multiplier /= 10
  }
  return total

}
  
const functions = [];

const royalFlush = (sortedHand, findMatchingCards, getObjectKey) => {
  if (
    sortedHand?.filter((card) => card.suit === sortedHand[0].suit)
      .length === 5 &&
    sortedHand[0]?.value - 4 === sortedHand[4]?.value && 
    (Object?.values(findMatchingCards).length === 5) &&
    sortedHand[0]?.value === 14
  ) {
    return 9000000 + addCardValues(sortedHand);
  }
}

const straightFlush = (sortedHand, findMatchingCards, getObjectKey) => { 
  if (
    (sortedHand.filter((card) => card.suit === sortedHand[0].suit)
      .length === 5) &&
    (sortedHand[0]?.value - 4 === sortedHand[4]?.value) &&
    (Object?.values(findMatchingCards).length === 5)
  ) {
    return 8000000 + addCardValues(sortedHand);
  }
}

const fourOfAKind = (sortedHand, findMatchingCards, getObjectKey) => {
  if (Object?.values(findMatchingCards).includes(4)) {
    return 7000000 + addCardValues(sortedHand);
  }
}

const fullHouse = (sortedHand, findMatchingCards, getObjectKey) => { 
  if ((Object?.values(findMatchingCards).includes(2)) && (Object?.values(findMatchingCards).includes(3))) {
    console.log("here")
    return 6000000 + addCardValues(sortedHand);
  }
}

const flush = (sortedHand, findMatchingCards, getObjectKey) => { 
  if (sortedHand.filter(card => card.suit === sortedHand[0].suit).length === 5) {
    return 5000000 + addCardValues(sortedHand);
  }
}

const straight = (sortedHand, findMatchingCards, getObjectKey) => { 
  if ((sortedHand[0]?.value - 4) === (sortedHand[4]?.value) && Object?.values(findMatchingCards).length === 5){
    return 4000000 + addCardValues(sortedHand);
  }
}

// extracting card values from sorted matching cards array
const createScorableArray = (findMatchingCards, start, end) => {

  const sortedMatchingCards = (Object.entries(findMatchingCards).sort((a,b) => b[1]-a[1]))
  const scorableHand = []
  sortedMatchingCards.forEach(card => {
    scorableHand.push(card[0])
  });
  sortUnmatchingCards(scorableHand, start, end)
  
  return scorableHand
}



const threeOfKind = (sortedHand, findMatchingCards, getObjectKey) => { 
  if (Object?.values(findMatchingCards).includes(3)) {

    const scorableHand = createScorableArray(findMatchingCards, 1, 2)

    return 3000000 + addCardValues(scorableHand);
  }
}

const twoPairs = (sortedHand, findMatchingCards, getObjectKey) => {
  if (Object?.values(findMatchingCards).includes(2) && Object?.values(findMatchingCards).length === 3) {
    return 2000000 + addCardValues(sortedHand);
  }
}

const pair = (sortedHand, findMatchingCards, getObjectKey) => { 
  if (Object?.values(findMatchingCards).includes(2)) {

    const scorableHand = createScorableArray(findMatchingCards, 1, 3)
    
    return 1000000 + addCardValues(scorableHand);
  }
}

functions.push(royalFlush, straightFlush, fourOfAKind, fullHouse, flush, straight, threeOfKind, twoPairs, pair)
    
  
