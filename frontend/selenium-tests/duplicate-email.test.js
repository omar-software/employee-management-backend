const { Builder, By, Key, until } = require('selenium-webdriver');

async function duplicateEmailTest() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:4200');

    // Login
    const usernameInput = await driver.wait(
      until.elementLocated(By.name('username')),
      10000
    );

    const passwordInput = await driver.wait(
      until.elementLocated(By.name('password')),
      10000
    );

    await usernameInput.clear();
    await usernameInput.sendKeys('admin');

    await passwordInput.clear();
    await passwordInput.sendKeys('1234', Key.ENTER);

    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Welcome, admin')]")),
      10000
    );

    // Open Add Employee page
    const addEmployeeButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Add Employee')]")),
      10000
    );

    await addEmployeeButton.click();

    // Fill form with duplicate email
    const firstNameInput = await driver.wait(
      until.elementLocated(By.name('firstName')),
      10000
    );

    const lastNameInput = await driver.wait(
      until.elementLocated(By.name('lastName')),
      10000
    );

    const emailInput = await driver.wait(
      until.elementLocated(By.name('email')),
      10000
    );

    await firstNameInput.clear();
    await firstNameInput.sendKeys('Duplicate');

    await lastNameInput.clear();
    await lastNameInput.sendKeys('Email');

    // هذا إيميل موجود عندك مسبقًا
    await emailInput.clear();
    await emailInput.sendKeys('sara@example.com');

    // Save
    const saveButton = await driver.findElement(
      By.xpath("//button[contains(text(), 'Save Employee')]")
    );

await saveButton.click();

await driver.sleep(3000);

const bodyText = await driver.findElement(By.tagName('body')).getText();

console.log('===== PAGE TEXT AFTER DUPLICATE EMAIL =====');
console.log(bodyText);
console.log('==========================================');

if (
  !bodyText.includes('Employee with this email already exists') &&
  !bodyText.includes('email already exists') &&
  !bodyText.includes('already exists') &&
  !bodyText.includes('duplicate')
) {
  throw new Error('Duplicate email error message not found');
}

console.log('✅ Selenium duplicate email test passed');

  } catch (error) {
    console.error('❌ Selenium duplicate email test failed');
    console.error(error);
  } finally {
    await driver.quit();
  }
}

duplicateEmailTest();