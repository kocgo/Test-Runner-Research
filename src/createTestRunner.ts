import path from "path";

import { Codecept, container as Container, event } from "codeceptjs";

const appDir = path.dirname(require.main.filename);

export interface RunnerArgs {
  test_id: string;
}

const createTestRunner = ({ test_id }: RunnerArgs): CodeceptJS.Codecept => {
  const options = { verbose: true };
  const config = createTestConfig(test_id);
  const runner = new Codecept(config, options);

  runner.initGlobals(__dirname);

  // create helpers, support files, mocha
  Container.create(config, {});

  event.dispatcher.on(event.step.passed, function (step) {
    const { name, status, startTime, endTime } = step;
    console.log("Step passed :", { name, status, startTime, endTime });
  });

  runner.runHooks(); // Event Listeners

  runner.loadTests(path.join(appDir, `/test_cache/${test_id}.js`));

  return runner;
};

export default createTestRunner;

// Test
import { v4 as uuidv4 } from "uuid";
import createTestFile from "./createTestFile";
import dummyCode from "./dummyCode";
import createTestConfig from "./createTestConfig";

if (require.main === module) {
  let test_id = uuidv4();

  createTestFile(dummyCode, test_id);

  const runner = createTestRunner({ test_id });
}
