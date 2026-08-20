import { basePage } from './basePage.js';
import { expect } from '@playwright/test';

class formPage extends basePage {

    constructor(page) {

        super(page);
        this.nameInput = page.locator('label:has-text("Name") + input')
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('#exampleInputPassword1');
        this.genderDropdown = page.locator('#exampleFormControlSelect1');
        this.employmentStatus = page.locator('input[name="inlineRadioOptions"] + label');
        this.dateOfBirth = page.locator('input[type="date"]');
        this.submitButton = page.locator('input[type="submit"]');
        this.successMessage = page.locator('div.alert.alert-success');
    }

    async launchForm() {
        await this.navigateToUrl(
            'https://rahulshettyacademy.com/angularpractice/'
        );
    }

    async enterName(name) {
        await this.enterText(this.nameInput, name);
    }

    async enterEmail(email) {
        await this.enterText(this.emailInput, email);
    }

    async enterPassword(password) {
        await this.enterText(this.passwordInput, password);
    }

    async selectGender(gender) {
        await this.genderDropdown.selectOption({ label: gender });
    }

    async selectEmploymentStatus(status) {
        await this.employmentStatus
            .filter({ hasText: status })
            .check();
    }

    async enterDateOfBirth(date) {
        await this.enterText(this.dateOfBirth, date);
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async verifyFormSubmission() {
    await expect(this.successMessage).toContainText(
        'The Form has been submitted successfully!'
    );
}
}

export { formPage };