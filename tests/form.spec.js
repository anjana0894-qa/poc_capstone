import { test, expect } from '@playwright/test';
import { formPage } from '../pages/formPage.js';
import { readFormData } from '../helpers/readFormData.js';

test('Fill and submit form', async ({ page }) => {
    const form = new formPage(page);
    const formData = readFormData();
    await form.launchForm();
    await form.enterName(formData.name);
    await form.enterEmail(formData.email);
    await form.enterPassword(formData.password);
    await form.selectGender(formData.gender);
    await form.selectEmploymentStatus(formData.employmentStatus);
    await form.enterDateOfBirth(formData.dateOfBirth);
    await form.submitForm();
    await form.verifyFormSubmission();
});