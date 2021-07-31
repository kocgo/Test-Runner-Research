import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const createTestFile = async (code: string, test_id: string) => {
  return writeFile(path.join(__dirname, `../test_cache/${test_id}.js`), code);
};

export default createTestFile;

// Test
if (require.main === module) {
  let code = `Feature("");

Scenario("test something", ({ I }) => {
  I.amOnPage("https://google.com");
  I.see("Google");
  pause();
  I.see("google");
});`;

  let test_id = uuidv4();

  createTestFile(code, test_id);
}
