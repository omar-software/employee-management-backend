const { Builder, By, Key } = require('selenium-webdriver');

async function negativeLoginTest() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:4200');

    const usernameInput = await driver.findElement(By.name('username'));
    const passwordInput = await driver.findElement(By.name('password'));

    await usernameInput.clear();
    await usernameInput.sendKeys('admin');

    await passwordInput.clear();
    await passwordInput.sendKeys('wrongpassword', Key.ENTER);

    await driver.sleep(2000);

    const bodyText = await driver.findElement(By.tagName('body')).getText();

    console.log('===== PAGE TEXT AFTER WRONG LOGIN =====');
    console.log(bodyText);
    console.log('======================================');

    if (!bodyText.includes('Login')) {
      throw new Error('User should stay on login page');
    }

    if (
      !bodyText.includes('Invalid') &&
      !bodyText.includes('incorrect') &&
      !bodyText.includes('failed') &&
      !bodyText.includes('error')
    ) {
      throw new Error('Login error message not found');
    }

    console.log('✅ Selenium negative login test passed');

  } catch (error) {
    console.error('❌ Selenium negative login test failed');
    console.error(error);
  } finally {
    await driver.quit();
  }
}

negativeLoginTest();