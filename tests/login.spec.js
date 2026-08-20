import { test } from "../fixtures/loginFixtures.js";

test("Login Test", async ({ loginPage }) => {
  await loginPage.launchSmarTerp();
  await loginPage.login(process.env.SMARTERP_USERNAME, process.env.SMARTERP_PASSWORD);
  await loginPage.verifyUserIsLoggedIn();
});
