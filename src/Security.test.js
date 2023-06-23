/*
* @jest-environment node
*/
import {
  apps,
  initializeTestApp,
  initializeAdminApp,
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';

import { setDoc, getDoc, doc, updateDoc, collection } from 'firebase/firestore';

import { RulesTestEnvironment } from '@firebase/rules-unit-testing';

import * as fs from "fs";

let testEnv;
let testEnvFirestore;
let userRef;

const host="127.0.0.1";

const port = "8080";
const PROJECT_ID = "poker-fcbd4";

const userAuth = { uid: "user123", email: "user@test.com" };

describe('Firestore security rules', () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        rules: fs.readFileSync('firestore.rules', 'utf8'),},
      hub: {
        host: "localhost",
        port: 4400,
      },
    });
  });

  beforeEach(async () => {
    await testEnv.clearFirestore()
  });

  it('Allows user to get/update their own user document', async () => {
    const alice = testEnv.authenticatedContext('alice').firestore()
    await assertSucceeds(setDoc(doc(alice, "users/alice"), {name: "alice"}));
    await assertSucceeds(getDoc(doc(alice, "users/alice")));
  })
  
  it('Does not allow user to get/update somebody elses user document', async () => {
    const alice = testEnv.authenticatedContext('alice').firestore()
    await assertFails(setDoc(doc(alice, "users/clark"), {name: "alice"}));
    await assertFails(getDoc(doc(alice, "users/clark")));
  })

  it('Allows authenticated user to get/update game document', async () => {
    const alice = testEnv.authenticatedContext('alice').firestore()
    await assertSucceeds(setDoc(doc(alice, "games/gamedID1234"), {name: "alice"}));
    await assertSucceeds(getDoc(doc(alice, "games/gamedID1234")));
  })
  
  it('Does not allow unauthenticated user to get/update game document', async () => {
    const alice = testEnv.unauthenticatedContext('alice').firestore()
    await assertFails(setDoc(doc(alice, "games/gamedID1234"), {name: "alice"}));
    await assertFails(getDoc(doc(alice, "games/gamedID1234")));
  })

  it('Allows only users registered with a game to get their game profile', async () => {
    const alice = testEnv.authenticatedContext('alice').firestore()
    const tina = testEnv.authenticatedContext('tina').firestore()
    await assertSucceeds(setDoc(doc(alice, "games/gamedID1234"), {name: "alice", current_players: ['alice']}));
    await assertSucceeds(getDoc(doc(alice, "games/gamedID1234/players/alice")));
    await assertFails(getDoc(doc(tina, "games/gamedID1234/players/alice")));
  })

  afterAll(() => {
    testEnv.cleanup()
  })
});
