import createTestRunner from "./createTestRunner";
import { v4 as uuidv4 } from "uuid";

const code = `
Feature("");

Scenario("test something", ({ I }) => {
  I.amOnPage("https://google.com");
  I.see("Google");
  pause();
  I.see("google");
});
`;

const testRunner = createTestRunner(uuidv4());

testRunner.run();
