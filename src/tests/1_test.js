Feature("");

Scenario("test something", ({ I }) => {
  I.amOnPage("https://google.com");
  I.see("Google");
  pause();
  I.see("google");
});
