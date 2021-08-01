export default `Feature("");

Scenario("test something", ({ I }) => {
  I.amOnPage("https://google.com");
  I.see("Google");
  I.see("google");
});`;
