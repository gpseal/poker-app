
import { arrayUnion, doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../components/Firestore";
import { getDeck } from "../cards/cardFunctions";
import { useState } from "react";

export const createGame = async (owner, deck, name, gameID) => {
    await setDoc(doc(db, "games", gameID), {
      name: name,
      owner: owner,
      players: 0,
      turn: 1,
      status: "waiting",
      deck: deck || null,
      current_players: [],
    });
    return
  };

export const joinGame = async (user, gameID) => {
    const deck = await getDeck(gameID)
    const hand = deck?.slice(0, 5)
    const newDeck = deck?.slice(5)

    await updateDoc(doc(db,"games", gameID), {
        players: increment(1),
        deck: newDeck,
        current_players: arrayUnion(user)
    })

    const game = await getDoc(doc(db, "games", gameID))

    await setDoc(doc(db, "games", gameID, "players", user), {
        cards: hand,
        playerNum: game.data().players,
    })

  return
}

export const endTurn = async (gameID) => {
  await updateDoc(doc(db,"games", gameID), {
    turn: increment(1),
  })
  return
}

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
  console.log(cardCount)
  
  if (cardCount) {

    //Royal Flush
        if (
          sortedHand.filter((card) => card.suit === sortedHand[0].suit)
            .length === 5 &&
          sortedHand[0]?.value + 4 === sortedHand[4]?.value && 
          sortedHand[0]?.value === 10
        ) {
          return 700 + parseInt(sortedHand[0].value);
        }

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

    //Full house

    //Flush
    if (sortedHand.filter(card => card.suit === sortedHand[0].suit).length === 5) {
      return 400 + parseInt(sortedHand[0].value);
    }

    //Straight
    if ((sortedHand[0]?.value + 4) === (sortedHand[4]?.value)){
      return 300 + parseInt(sortedHand[0].value);
    }

    // Three of a kind
    if (Object?.values(cardCount).includes(3)) {
      
      return 200 + parseInt(getObjectKey(cardCount, 3));
    }
    
    // Two Pair
    
    // Pair
    if (Object?.values(cardCount).includes(2)) {
      return 100 + parseInt(getObjectKey(cardCount, 2));
    }
    
    return parseInt(sortedHand[4].value);
    // High Card
  }
  

  return 
}