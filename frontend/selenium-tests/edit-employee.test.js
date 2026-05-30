const { Builder, By, Key, until } = require('selenium-webdriver');

async function editEmployeeTest() {
  const driver = await new Builder().forBrowser('chrome').build();

  const uniqueEmail = `edit${Date.now()}@test.com`;

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

    const firstNameInputAdd = await driver.wait(
      until.elementLocated(By.name('firstName')),
      10000
    );

    const lastNameInputAdd = await driver.wait(
      until.elementLocated(By.name('lastName')),
      10000
    );

    const emailInputAdd = await driver.wait(
      until.elementLocated(By.name('email')),
      10000
    );

    await firstNameInputAdd.clear();
    await firstNameInputAdd.sendKeys('Edit');

    await lastNameInputAdd.clear();
    await lastNameInputAdd.sendKeys('Test');

    await emailInputAdd.clear();
    await emailInputAdd.sendKeys(uniqueEmail);

    const saveButton = await driver.findElement(
      By.xpath("//button[contains(text(), 'Save Employee')]")
    );

    await saveButton.click();

    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Employee added successfully')]")),
      10000
    );

    // روح لآخر صفحة حتى نلاقي الموظف الجديد
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

    // الآن نحذف/نعدل الصف الذي يحتوي الإيميل نفسه
    const editButtonForNewEmployee = await driver.wait(
      until.elementLocated(
        By.xpath(`//tr[td[contains(text(), '${uniqueEmail}')]]//button[contains(text(), 'Edit')]`)
      ),
      10000
    );

    await editButtonForNewEmployee.click();

    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Edit Employee')]")),
      10000
    );

    const firstNameInput = await driver.wait(
      until.elementLocated(By.name('firstName')),
      10000
    );

    const emailInput = await driver.wait(
      until.elementLocated(By.name('email')),
      10000
    );

    await firstNameInput.clear();
    await firstNameInput.sendKeys('SeleniumEdit');

    await emailInput.clear();
    await emailInput.sendKeys(uniqueEmail);

    const updateButton = await driver.findElement(
      By.xpath("//button[contains(text(), 'Update Employee')]")
    );

    await updateButton.click();

    await driver.sleep(2000);

    const bodyTextAfterUpdate = await driver.findElement(By.tagName('body')).getText();

    console.log('===== PAGE TEXT AFTER UPDATE =====');
    console.log(bodyTextAfterUpdate);
    console.log('=================================');

    if (
      !bodyTextAfterUpdate.includes('Employee updated successfully') &&
      !bodyTextAfterUpdate.includes('SeleniumEdit')
    ) {
      throw new Error('Employee update confirmation not found');
    }

    console.log('✅ Selenium edit employee test passed');
    console.log('Edited employee email:', uniqueEmail);

  } catch (error) {
    console.error('❌ Selenium edit employee test failed');
    console.error(error);
  } finally {
    await driver.quit();
  }
}

editEmployeeTest();