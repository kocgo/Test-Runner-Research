import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import dummyCode from "./dummyCode";

const createTestFile = async (code: string, test_id: string) => {
  return writeFile(path.join(__dirname, `../test_cache/${test_id}.js`), code);
};

export default createTestFile;

// Test
if (require.main === module) {
  let test_id = uuidv4();
  createTestFile(dummyCode, test_id);
}
