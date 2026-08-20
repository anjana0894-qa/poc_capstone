import { expect } from "@playwright/test";
class basePage{
  /**
   * @param {import('@playwright/test').Page} page
   */

constructor(page){
this.page = page}


async navigateToUrl(url){
   await this.page.goto(url)
}

async enterText(locator, text){
 await locator.fill(text)
}

async validatePageTitle(expectedTitle){
    await expect(this.page).toHaveTitle(expectedTitle)
}
async validatePageUrl(expectedUrl){
    await expect(this.page).toHaveURL(expectedUrl)}
}

export {basePage}