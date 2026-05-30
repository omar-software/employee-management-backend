const { Builder, By, Key, until } = require('selenium-webdriver');

async function loginTest() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // 1. Open Angular app
    await driver.get('http://localhost:4200');

    // 2. Find login inputs
    const usernameInput = await driver.wait(
      until.elementLocated(By.name('username')),
      10000
    );

    const passwordInput = await driver.wait(
      until.elementLocated(By.name('password')),
      10000
    );

    // 3. Login with admin / 1234
    await usernameInput.clear();
    await usernameInput.sendKeys('admin');

    await passwordInput.clear();
    await passwordInput.sendKeys('1234', Key.ENTER);

    // 4. Check Welcome, admin
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Welcome, admin')]")),
      10000
    );

    // 5. Check employees page
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Employee Management')]")),
      10000
    );

    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Employees')]")),
      10000
    );

    console.log('✅ Selenium login test passed');

  } catch (error) {
    console.error('❌ Selenium login test failed');
    console.error(error);
  } finally {
    await driver.quit();
  }
}

loginTest();