const { Builder, By, Key, until } = require('selenium-webdriver');

async function deleteEmployeeTest() {
  const driver = await new Builder().forBrowser('chrome').build();

  const uniqueEmail = `delete${Date.now()}@test.com`;

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

    // Add Employee
    const addEmployeeButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Add Employee')]")),
      10000
    );

    await addEmployeeButton.click();

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
    await firstNameInput.sendKeys('Delete');

    await lastNameInput.clear();
    await lastNameInput.sendKeys('Test');

    await emailInput.clear();
    await emailInput.sendKeys(uniqueEmail);

    const saveButton = await driver.findElement(
      By.xpath("//button[contains(text(), 'Save Employee')]")
    );

    await saveButton.click();

    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Employee added successfully')]")),
      10000
    );

    // Go through pages until the new employee email is visible
    while (true) {
      const bodyText = await driver.findElement(By.tagName('body')).getText();

      if (bodyText.includes(uniqueEmail)) {
        break;
      }

      const nextButtons = await driver.findElements(
        By.xpath("//button[contains(text(), 'Next')]")
      );

      if (nextButtons.length === 0) {
        throw new Error('Next button not found and employee email not visible');
      }

      const nextDisabled = await nextButtons[0].getAttribute('disabled');

      if (nextDisabled !== null) {
        throw new Error('Reached last page but employee email not visible');
      }

      await nextButtons[0].click();
      await driver.sleep(1000);
    }

    // Delete only the row that contains the unique email
    const deleteButtonForNewEmployee = await driver.wait(
      until.elementLocated(
        By.xpath(`//tr[td[contains(text(), '${uniqueEmail}')]]//button[contains(text(), 'Delete')]`)
      ),
      10000
    );

    await deleteButtonForNewEmployee.click();

    // Accept browser confirm if it exists
    try {
      const alert = await driver.switchTo().alert();
      await alert.accept();
    } catch (e) {
      // No alert exists
    }

    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Employee deleted successfully')]")),
      10000
    );

    const bodyTextAfterDelete = await driver.findElement(By.tagName('body')).getText();

    console.log('===== PAGE TEXT AFTER DELETE =====');
    console.log(bodyTextAfterDelete);
    console.log('=================================');

    if (!bodyTextAfterDelete.includes('Employee deleted successfully')) {
      throw new Error('Delete confirmation not found');
    }

    if (bodyTextAfterDelete.includes(uniqueEmail)) {
      throw new Error('Deleted employee email is still visible');
    }

    console.log('✅ Selenium delete employee test passed');
    console.log('Deleted employee email:', uniqueEmail);

  } catch (error) {
    console.error('❌ Selenium delete employee test failed');
    console.error(error);
  } finally {
    await driver.quit();
  }
}

deleteEmployeeTest();