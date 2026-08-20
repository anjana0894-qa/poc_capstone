# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: form.spec.js >> Fill and submit form
- Location: tests\form.spec.js:5:1

# Error details

```
ReferenceError: expect is not defined
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e5]:
    - link "ProtoCommerce" [ref=e6] [cursor=pointer]:
      - /url: "#"
    - list [ref=e7]:
      - listitem [ref=e8]:
        - link "Home" [ref=e9] [cursor=pointer]:
          - /url: /angularpractice
      - listitem [ref=e10]:
        - link "Shop" [ref=e11] [cursor=pointer]:
          - /url: /angularpractice/shop
  - generic [ref=e12]:
    - generic [ref=e13]:
      - generic [ref=e15]:
        - heading "Protractor Tutorial" [level=1] [ref=e16]
        - heading "by QAClick Academy" [level=4] [ref=e17]
        - heading "This is a demo eCommerce web appplication developed using Angular 5 to help QAClick Academy students learn Protractor framework for testing Angular applications." [level=5] [ref=e18]
        - heading "Be assured that product you ordered in this site will never arrive, Instead we hope your takeaway will be in learning Protractor!" [level=6] [ref=e19]
      - generic [ref=e21]:
        - link "close" [ref=e22] [cursor=pointer]:
          - /url: "#"
          - text: ×
        - strong [ref=e23]: Success!
        - text: The Form has been submitted successfully!.
      - generic [ref=e24]:
        - generic [ref=e25]:
          - generic [ref=e26]: Name
          - textbox [ref=e27]: Anjana
        - generic [ref=e28]:
          - generic [ref=e29]: Email
          - textbox [ref=e30]: anjana.test@example.com
        - generic [ref=e31]:
          - generic [ref=e32]: Password
          - textbox "Password" [ref=e33]: Test@12345
        - generic [ref=e34]:
          - checkbox "Check me out if you Love IceCreams!" [ref=e35]
          - generic [ref=e36]: Check me out if you Love IceCreams!
        - generic [ref=e37]:
          - generic [ref=e38]: Gender
          - combobox "Gender" [ref=e39]:
            - option "Male"
            - option "Female" [selected]
        - generic [ref=e40]:
          - generic [ref=e41]: "Employment Status:"
          - generic [ref=e42]:
            - radio "Student" [ref=e43]
            - generic [ref=e44]: Student
          - generic [ref=e45]:
            - radio "Employed" [checked] [ref=e46]
            - generic [ref=e47]: Employed
          - generic [ref=e48]:
            - radio "Entrepreneur (disabled)" [disabled] [ref=e49]
            - generic [ref=e50]: Entrepreneur (disabled)
        - generic [ref=e51]:
          - generic [ref=e52]: Date of Birth
          - textbox [ref=e53]: 2021-08-20
        - button "Submit" [active] [ref=e54] [cursor=pointer]
      - heading [level=4] [ref=e55]:
        - text: "Two-way Data Binding example:"
        - textbox [ref=e56]: Anjana
    - contentinfo [ref=e57]:
      - paragraph [ref=e59]: Copyright © ProtoCommerce 2018
```

# Test source

```ts
  1  | import { basePage } from './basePage.js';
  2  | 
  3  | class formPage extends basePage {
  4  | 
  5  |     constructor(page) {
  6  | 
  7  |         super(page);
  8  |         this.nameInput = page.locator('label:has-text("Name") + input')
  9  |         this.emailInput = page.locator('input[name="email"]');
  10 |         this.passwordInput = page.locator('#exampleInputPassword1');
  11 |         this.genderDropdown = page.locator('#exampleFormControlSelect1');
  12 |         this.employmentStatus = page.locator('input[name="inlineRadioOptions"] + label');
  13 |         this.dateOfBirth = page.locator('input[type="date"]');
  14 |         this.submitButton = page.locator('input[type="submit"]');
  15 |         this.successMessage = page.locator('div.alert.alert-success');
  16 |     }
  17 | 
  18 |     async launchForm() {
  19 |         await this.navigateToUrl(
  20 |             'https://rahulshettyacademy.com/angularpractice/'
  21 |         );
  22 |     }
  23 | 
  24 |     async enterName(name) {
  25 |         await this.enterText(this.nameInput, name);
  26 |     }
  27 | 
  28 |     async enterEmail(email) {
  29 |         await this.enterText(this.emailInput, email);
  30 |     }
  31 | 
  32 |     async enterPassword(password) {
  33 |         await this.enterText(this.passwordInput, password);
  34 |     }
  35 | 
  36 |     async selectGender(gender) {
  37 |         await this.genderDropdown.selectOption({ label: gender });
  38 |     }
  39 | 
  40 |     async selectEmploymentStatus(status) {
  41 |         await this.employmentStatus
  42 |             .filter({ hasText: status })
  43 |             .check();
  44 |     }
  45 | 
  46 |     async enterDateOfBirth(date) {
  47 |         await this.enterText(this.dateOfBirth, date);
  48 |     }
  49 | 
  50 |     async submitForm() {
  51 |         await this.submitButton.click();
  52 |     }
  53 | 
  54 |     async verifyFormSubmission() {
> 55 |     await expect(this.successMessage).toContainText(
     |     ^ ReferenceError: expect is not defined
  56 |         'The Form has been submitted successfully!'
  57 |     );
  58 | }
  59 | }
  60 | 
  61 | export { formPage };
```