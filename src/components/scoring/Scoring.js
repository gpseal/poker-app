
export const CalculateScore = (cardHand) => {

  // create copy of hand to leave original in tact
  const sortableHand = cardHand?.map(c => c)

  // sort from largest to smallest value
  const sortedHand = sortableHand?.sort((a, b) => {
    return  b.value - a.value
  })
  
  // find if there are matching cards in the deck by comparing values
  const findMatchingCards = sortedHand?.reduce((tally, card) => {
    tally[card.value] = (tally[card.value] || 0) + 1;
    return tally;
  }, {});
  
  // const getObjectKey = (obj, value) => {
  //   return Object.keys(obj).find(key => obj[key] === value)
  // }

  // console.log(getObjectKey);

  for (let index = 0; index < functions.length; index++) {
    const f = functions[index];
    const score = f(sortedHand, findMatchingCards, /*getObjectKey*/)
    if (score) {
      return score
    }
  }

  // if no hands are matched, process high card value
  const scorableHand = createScorableArray(findMatchingCards, 0, 4);

  return {
    score: addCardValues(scorableHand),
    handName: "High Card",
  };
}

// https://www.tutorialspoint.com/sorting-only-a-part-of-an-array-javascript
// if there are matching cards in they should stay at the front of the array, only remaining cards should be sorted
const sortUnmatchingCards = (cards, start, end) => {
  try {
    const unmatching = cards.splice(start, end - start + 1)
    unmatching.sort(function(a, b){return b-a});
    cards.splice(start, 0, ...unmatching)
    return
  } catch (error) {
    
  }
}

const addCardValues = (cards) => {
  // add together ordered card values to produce a score
  try {
    let total= 0;
    // card values must be separated by 3 places to avoid overflow of values
    let multiplier = 100000000
    for (let i = 0; i < cards.length; i++) {
      total = total + (cards[i] * multiplier)
      multiplier /= 100
    }
    return total
  } catch (error) {
    alert(error);
  }
}

// creating scorable array, ensuring matching cards are placed at the front for score calculation
const createScorableArray = (findMatchingCards, start, end) => {
  try {
    // sorting by adding matching values to front of array
    const sortedMatchingCards = (Object.entries(findMatchingCards).sort((a,b) => b[1]-a[1]))
    const scorableHand = []
    
    //extracting values of cards from array
    sortedMatchingCards.forEach(card => {
      scorableHand.push(card[0])
    });
    
    //sorting cards that do not have a matching value
    sortUnmatchingCards(scorableHand, start, end)
    
    return scorableHand
  } catch (error) {
    alert(error);
  }
}

const functions = [];
const scoreMultiplier = 10000000000

const royalFlush = (sortedHand, findMatchingCards, /*getObjectKey*/) => {
  try {
    if (
      sortedHand?.filter((card) => card.suit === sortedHand[0].suit)
      .length === 5 &&
      sortedHand[0]?.value - 4 === sortedHand[4]?.value && 
      (Object?.values(findMatchingCards).length === 5) &&
      sortedHand[0]?.value === 14
      ) {
        const scorableHand = createScorableArray(findMatchingCards, 0, 4);
        return {
        score: (9 * scoreMultiplier) + addCardValues(scorableHand),
        handName: "Royal Flush",
      };
    }
  } catch (error) {
    alert(error);
  }
}

const straightFlush = (sortedHand, findMatchingCards, /*getObjectKey*/) => { 
  try {
    if (
      (sortedHand.filter((card) => card.suit === sortedHand[0].suit)
      .length === 5) &&
      (sortedHand[0]?.value - 4 === sortedHand[4]?.value) &&
      (Object?.values(findMatchingCards).length === 5)
      ) {
      const scorableHand = createScorableArray(findMatchingCards, 0, 4);
      return {score: (8 * scoreMultiplier) + addCardValues(scorableHand),
              handName: "Straight Flush"}
    }
  } catch (error) {
    alert(error);
  }
}

const fourOfAKind = (sortedHand, findMatchingCards, /*getObjectKey*/) => {
  try {
    if (Object?.values(findMatchingCards).includes(4)) {
      const scorableHand = createScorableArray(findMatchingCards, 1, 1);
      return {score: (7 * scoreMultiplier) + addCardValues(scorableHand),
              handName: "4 of a Kind"}
    }
  } catch (error) {
    alert(error);
  }
}

const fullHouse = (sortedHand, findMatchingCards, /*getObjectKey*/) => { 
  try {
    if ((Object?.values(findMatchingCards).includes(2)) && (Object?.values(findMatchingCards).includes(3))) {
      const scorableHand = createScorableArray(findMatchingCards, 1, 1);
      return {score: (6 * scoreMultiplier) + addCardValues(scorableHand),
              handName: "Full House"}
    }
  } catch (error) {
    alert(error);
  }
}

const flush = (sortedHand, findMatchingCards, /*getObjectKey*/) => { 
  try {
    if (sortedHand.filter(card => card.suit === sortedHand[0].suit).length === 5) {
      const scorableHand = createScorableArray(findMatchingCards, 0, 4);
      return {score: (5 * scoreMultiplier) + addCardValues(scorableHand),
              handName: "Flush"}
    }
  } catch (error) {
    alert(error);
  }
}

const straight = (sortedHand, findMatchingCards, /*getObjectKey*/) => { 
  try {
    if ((sortedHand[0]?.value - 4) === (sortedHand[4]?.value) && Object?.values(findMatchingCards).length === 5){
      const scorableHand = createScorableArray(findMatchingCards, 0, 4);
      return {score: (4 * scoreMultiplier) + addCardValues(scorableHand),
              handName: "Straight"}
    }
  } catch (error) {
    alert(error);
  }
}

const threeOfKind = (sortedHand, findMatchingCards, /*getObjectKey*/) => { 
  try {
    if (Object?.values(findMatchingCards).includes(3)) {
  
      const scorableHand = createScorableArray(findMatchingCards, 1, 2)
      return {score: (3 * scoreMultiplier) + addCardValues(scorableHand),
              handName: "3 of a Kind"}
    }
  } catch (error) {
    alert(error);
  }
}

const twoPairs = (sortedHand, findMatchingCards, /*getObjectKey*/) => {
  try {
    if (Object?.values(findMatchingCards).includes(2) && Object?.values(findMatchingCards).length === 3) {
      const scorableHand = createScorableArray(findMatchingCards, 2, 2)
      return {score: (2 * scoreMultiplier) + addCardValues(scorableHand),
              handName: "2 Pair"}
    }
  } catch (error) {
    alert(error);
  }
}

const pair = (sortedHand, findMatchingCards, /*getObjectKey*/) => { 
  try {
    if (Object?.values(findMatchingCards).includes(2)) {

      const scorableHand = createScorableArray(findMatchingCards, 1, 3)
  
      return {score: scoreMultiplier + addCardValues(scorableHand),
              handName: "Pair"}
    }
  } catch (error) {
    alert(error);
  }
}

functions.push(royalFlush, straightFlush, fourOfAKind, fullHouse, flush, straight, threeOfKind, twoPairs, pair)
    
  
