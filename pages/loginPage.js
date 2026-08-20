import { basePage } from './basePage.js';

class loginPage extends basePage{
    constructor(page){
    super(page)
    this.usernameInput =  page.locator('#username')
    this.passwordInput = page.locator('#password')
    this.loginButton = page.locator('button[type="submit"]')
}

 async launchSmarTerp() {
    await this.navigateToUrl("https://smarterp-wgaw.onrender.com/");
  }


  async login(username, password) {
    await this.enterText(this.usernameInput, username);
    await this.enterText(this.passwordInput, password);
    await this.loginButton.click();
  }

    async verifyUserIsLoggedIn() {
    await this.validatePageTitle("SmartERP Dashboard");
    }


}
  export {loginPage}
