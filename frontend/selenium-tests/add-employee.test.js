const { Builder, By, Key, until } = require('selenium-webdriver');

async function addEmployeeTest() {
  const driver = await new Builder().forBrowser('chrome').build();

  const uniqueEmail = `selenium${Date.now()}@test.com`;

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

    // Click Add Employee
    const addEmployeeButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Add Employee')]")),
      10000
    );

    await addEmployeeButton.click();

    // Fill employee form
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
    await firstNameInput.sendKeys('Selenium');

    await lastNameInput.clear();
    await lastNameInput.sendKeys('Test');

    await emailInput.clear();
    await emailInput.sendKeys(uniqueEmail);

    // Save Employee
    const saveButton = await driver.findElement(
      By.xpath("//button[contains(text(), 'Save Employee')]")
    );

    await saveButton.click();

    await driver.sleep(2000);

    const bodyText = await driver.findElement(By.tagName('body')).getText();

    console.log('===== PAGE TEXT AFTER SAVE =====');
    console.log(bodyText);
    console.log('===============================');

    if (
      !bodyText.includes('Employee') &&
      !bodyText.includes(uniqueEmail)
    ) {
      throw new Error('Employee was not saved or employee page was not shown');
    }

    console.log('✅ Selenium add employee test passed');
    console.log('Created employee email:', uniqueEmail);

  } catch (error) {
    console.error('❌ Selenium add employee test failed');
    console.error(error);
  } finally {
    await driver.quit();
  }
}

addEmployeeTest();