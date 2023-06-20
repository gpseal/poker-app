/**
 * @jest-environment jsdom
 */
import { initializeTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";

beforeAll(async () => {
    const testEnvironment = await initializeTestEnvironment({
        projectId: "poker-fcbd4",
        firestore: {
          rules: readFileSync("firestore.rules", "utf-8"),
        },
        hub: {
          host: "localhost",
          port: 4400,
        },
      });
  });