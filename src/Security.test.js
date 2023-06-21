// /**
//  * @jest-environment jsdom
//  */
// import { initializeTestEnvironment, assertFails, assertSucceeds, readFileSync, RulesTestEnvironment } from "@firebase/rules-unit-testing";
// import { setDoc, getDoc, doc, collection } from "firebase/firestore";
// import * as fs from "node:fs"
// import { db } from "./components/Firestore";

// let testEnv
// let alice;
// let aliceFirestore

// beforeAll(async () => {
//     testEnv = await initializeTestEnvironment({
//         projectId: "poker-fcbd4",
//         firestore: {
//           rules: fs.readFileSync("firestore.rules", "utf-8"),
//         },
//         hub: {
//           host: "localhost",
//           port: 4400,
//         },
//       });
//     alice = testEnv.authenticatedContext('alice');
//     aliceFirestore = alice.firestore()
// }, 10000);

// console.log(aliceFirestore)

// it("allows user to fetch userData'", async () => {

//   console.log(`aliceFirestore: ${aliceFirestore}`)
//   await assertSucceeds(setDoc(doc(aliceFirestore, 'games/alice'), {name: "alice"}));

// });

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
        rules: fs.readFileSync('firestore.rules', 'utf8'),
        host: host, 
        port: port },
      hub: {
        host: "localhost",
        port: 4400,
      },
    });
    // await testEnv.clearFirestore()
    //   testEnvFirestore = testEnv
    //       .authenticatedContext('alice', {
    //           email: 'alice@example.com',
    //       })
    //       .firestore()
  });

  beforeEach(async () => {
    await testEnv.clearFirestore()
  });


  it('user is able to setDoc', async () => {
    const alice = testEnv
          .authenticatedContext('alice').firestore()
    console.log(alice)
    await assertSucceeds(setDoc(doc(alice, "users/alice"), {name: "alice"}));
  })

  it('User is able to get a document', async () => {
    const alice = testEnv
          .authenticatedContext('alice').firestore()
    await assertSucceeds(getDoc(doc(alice, "users/alice")));
})

afterAll(() => {
  testEnv.cleanup()
})
});
