import path from "path";
import { Codecept, container as Container, event } from "codeceptjs";

export interface RunnerArgs {
  test_id: string;
}

const createTestRunner = async ({
  test_id,
}: RunnerArgs): Promise<CodeceptJS.Codecept> => {
  const options = { verbose: true };
  const config = await createTestConfig(test_id);
  const runner = new Codecept(config, options);

  runner.initGlobals(path.join(__dirname, `../test_cache/`));

  // create helpers, support files, mocha
  Container.create(config, {});

  // event.dispatcher.on(event, function (step) {
  //   const { name, status, startTime, endTime } = step;
  //   console.log("Step passed :", { name, status, startTime, endTime });
  // });

  runner.runHooks();

  runner.loadTests(path.join(__dirname, `../test_cache/${test_id}.js`));

  return runner;
};

export default createTestRunner;

// Test
import { v4 as uuidv4 } from "uuid";
import createTestFile from "./createTestFile";
import dummyCode from "./dummyCode";
import createTestConfig from "./createTestConfig";
import { inspect } from "util";

if (require.main === module) {
  (async () => {
    let test_id = uuidv4();

    await createTestFile(dummyCode, test_id);

    const runner = await createTestRunner({ test_id });

    // @ts-ignore
    console.log(inspect(runner));
    runner.run();
  })();
}
