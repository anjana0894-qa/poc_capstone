import {test as base, expect} from '@playwright/test'
import { loginPage } from '../pages/loginPage'

const test = base.extend({
  loginPage: async ({ page }, use) => {
    const login = new loginPage(page);
    await use(login);
  }
});

export { test , expect};
