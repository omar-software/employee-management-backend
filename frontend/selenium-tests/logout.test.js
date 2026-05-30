const { Builder, By, Key, until } = require('selenium-webdriver');

async function logoutTest() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // 1. Open Angular app
    await driver.get('http://localhost:4200');

    // 2. Login
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

    // 3. Check login success
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Welcome, admin')]")),
      10000
    );

    // 4. Click Logout
    const logoutButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Logout')]")),
      10000
    );

    await logoutButton.click();

    // 5. Check login page is shown again
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Please login to manage employees')]")),
      10000
    );

    console.log('✅ Selenium logout test passed');

  } catch (error) {
    console.error('❌ Selenium logout test failed');
    console.error(error);
  } finally {
    await driver.quit();
  }
}

logoutTest();