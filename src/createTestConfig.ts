import { v4 as uuidv4 } from "uuid";
import { config as Config } from "codeceptjs";

const createTestConfig = async (test_id: string) => {
  return Config.create({});
};

export default createTestConfig;

// Test
import { inspect } from "util";
if (require.main === module) {
  (async () => {
    let test_id = uuidv4();
    const result = await createTestConfig(test_id);
    console.log(inspect(result));
  })();
}
