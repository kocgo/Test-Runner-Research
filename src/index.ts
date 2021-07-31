import interactive from "codeceptjs/lib/command/interactive";

// interactive("_test.js", {
//   verbose: true,
// });

// Run codecept inside my code
import { Codecept, container as Container, event } from "codeceptjs";

import path from "path";
import { config } from "../codecept.conf";

const options = { verbose: true };
const testInstance = new Codecept(config, options);

testInstance.initGlobals(__dirname);

// create helpers, support files, mocha
Container.create(config, {});

event.dispatcher.on(event.step.passed, function (step) {
  console.log("step passed YHOOOO", step);
});

// event listeners hook
testInstance.runHooks();

testInstance.loadTests(path.join(__dirname, "./tests/*_test.js"));

console.log(testInstance);

testInstance.run();
