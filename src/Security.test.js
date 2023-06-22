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


  it('user is able to setDoc', async () => {
    const alice = testEnv.authenticatedContext('alice').firestore()
    console.log(alice)
    await assertSucceeds(setDoc(doc(alice, "users/alice"), {name: "alice"}));
  })

  it('User is able to get a document', async () => {
    const alice = testEnv.authenticatedContext('alice').firestore()
    await assertSucceeds(getDoc(doc(alice, "users/alice")));
})

afterAll(() => {
  testEnv.cleanup()
})
});
