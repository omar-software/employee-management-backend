# Employee Management Frontend

Angular frontend for Employee Management System.

This project works with a Spring Boot backend.

---

## Technologies

- Angular
- TypeScript
- HTML / CSS
- Selenium WebDriver
- Spring Boot Backend API

---

## Backend

Backend runs on:

```text
http://localhost:8080
```

Login API:

```text
POST /api/auth/login
```

Valid test login:

```text
username: admin
password: 1234
```

---

## Frontend

Frontend runs on:

```text
http://localhost:4200
```

Start Angular:

```powershell
npm.cmd start
```

or:

```powershell
ng.cmd serve
```

---

## Install dependencies

```powershell
npm.cmd install
```

---

## Selenium Tests

Selenium tests are inside:

```text
selenium-tests/
```

Installed dependency:

```powershell
npm.cmd install selenium-webdriver --save-dev
```

---

## Run Selenium Tests

### Login test

```powershell
npm.cmd run selenium:login
```

### Logout test

```powershell
npm.cmd run selenium:logout
```

### Add Employee test

```powershell
npm.cmd run selenium:add
```

### Edit Employee test

```powershell
npm.cmd run selenium:edit
```

### Delete Employee test

```powershell
npm.cmd run selenium:delete
```

### Negative Login test

```powershell
npm.cmd run selenium:negative-login
```

### Duplicate Email test

```powershell
npm.cmd run selenium:duplicate-email
```

### Run all Selenium tests

```powershell
npm.cmd run selenium:all
```

---

## Current Selenium Coverage

The project currently tests:

- Successful login
- Logout
- Add employee
- Edit employee
- Delete employee
- Wrong login credentials
- Duplicate email validation

---

## Notes

Before running Selenium tests, make sure:

1. Spring Boot backend is running on port `8080`
2. Angular frontend is running on port `4200`
3. Chrome browser is installed

Chrome messages like these can be ignored:

```text
DEPRECATED_ENDPOINT
PHONE_REGISTRATION_ERROR
wrong_secret
```

They are Chrome/Google service messages, not project errors.

---

## Project Status

Current status:

- Spring Boot backend is working
- Angular frontend is working
- Login with localStorage is working
- CRUD Employees is working
- Search, Pagination, Dashboard cards are working
- Duplicate email validation is working
- Selenium E2E tests are working