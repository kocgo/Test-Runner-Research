import path from "path";

import { Codecept, container as Container, event } from "codeceptjs";
import { config } from "../codecept.conf";

const appDir = path.dirname(require.main.filename);

export interface RunnerArgs {
  test_id: string;
}

export default ({ test_id }: RunnerArgs): CodeceptJS.Codecept => {
  const options = { verbose: true };
  const runner = new Codecept(config, options);

  runner.initGlobals(__dirname);

  // create helpers, support files, mocha
  Container.create(config, {});

  event.dispatcher.on(event.step.passed, function (step) {
    console.log(step);
    const { name, status, startTime, endTime } = step;
    console.log("Step passed :", { name, status, startTime, endTime });
  });

  event.dispatcher.emit("");
  // event listeners hook
  runner.runHooks();

  runner.loadTests(path.join(appDir, `/test_cache/${test_id}.js`));

  return runner;
};
