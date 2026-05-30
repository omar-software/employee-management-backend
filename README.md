# Spring Boot Employee Management

Full-stack Employee Management System built with Spring Boot, Angular, Thymeleaf, Spring Data JPA, MariaDB, Spring Security, Swagger/OpenAPI, and Selenium E2E tests.

The project includes a Spring Boot backend, an Angular frontend inside the `frontend/` folder, Thymeleaf web pages, REST APIs, login functionality, employee CRUD operations, duplicate email validation, database persistence, and automated Selenium tests.

---

## Technologies

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- MariaDB
- Thymeleaf
- Angular
- TypeScript
- HTML / CSS
- Swagger / OpenAPI
- Selenium WebDriver
- Maven
- npm

---

## Project Structure

```text
spring-boot-employee-management
│
├── src/                         Spring Boot backend source code
├── frontend/                    Angular frontend source code
├── .mvn/                        Maven wrapper files
├── pom.xml                      Maven project configuration
├── mvnw                         Maven wrapper for Linux/macOS
├── mvnw.cmd                     Maven wrapper for Windows
├── LICENSE                      MIT License
└── README.md                    Project documentation
```

Important backend packages:

```text
src/main/java/com/omar/employeemanagement

controller
service
repository
model
security
config
exception
user
```

Important frontend folders:

```text
frontend/src/app/components
frontend/src/app/services
frontend/src/app/guards
frontend/selenium-tests
```

---

## Backend URL

The Spring Boot backend runs on:

```text
http://localhost:8080
```

---

## Angular Frontend URL

The Angular frontend runs on:

```text
http://localhost:4200
```

---

## Thymeleaf Web UI

The Spring Boot Thymeleaf employee pages are available at:

```text
http://localhost:8080/employees-page
```

---

## Login API

```text
POST /api/auth/login
```

Valid test login:

```text
username: admin
password: 1234
```

---

## Employees REST API

### Get all employees

```text
GET /api/employees
```

### Get employee by ID

```text
GET /api/employees/{id}
```

### Create employee

```text
POST /api/employees
```

Example request:

```json
{
  "firstName": "Omar",
  "lastName": "Mohamad-Ali",
  "email": "omar@example.com"
}
```

### Update employee

```text
PUT /api/employees/{id}
```

Example request:

```json
{
  "firstName": "Omar",
  "lastName": "Mohamad-Ali",
  "email": "omar@example.com"
}
```

### Delete employee

```text
DELETE /api/employees/{id}
```

---

## Swagger / OpenAPI

Swagger UI is available at:

```text
http://localhost:8080/swagger-ui/index.html
```

OpenAPI JSON is available at:

```text
http://localhost:8080/v3/api-docs
```

---

## Database

This project uses MariaDB.

Database name:

```text
employee_management_api
```

Database configuration is inside:

```text
src/main/resources/application.properties
```

Make sure MariaDB/MySQL is running before starting the backend.

---

## Run Backend

From the project root folder, run:

```powershell
.\mvnw.cmd spring-boot:run
```

Backend should start on:

```text
http://localhost:8080
```

---

## Run Angular Frontend

Open a second PowerShell terminal and run:

```powershell
cd frontend
npm install
npm start
```

Angular should start on:

```text
http://localhost:4200
```

---

## Build Backend

```powershell
.\mvnw.cmd clean package
```

---

## Build Angular Frontend

From the `frontend` folder, run:

```powershell
npm run build
```

---

## Selenium E2E Tests

Selenium tests are located inside:

```text
frontend/selenium-tests
```

Before running Selenium tests, make sure:

- Spring Boot backend is running on port 8080
- Angular frontend is running on port 4200
- Chrome browser is installed

Run all Selenium tests:

```powershell
cd frontend
npm run selenium:all
```

Available Selenium test commands:

```text
npm run selenium:login
npm run selenium:logout
npm run selenium:add
npm run selenium:edit
npm run selenium:delete
npm run selenium:negative-login
npm run selenium:duplicate-email
npm run selenium:all
```

---

## Main Features

- Spring Boot backend
- Angular frontend
- Thymeleaf employee web pages
- Login API
- LocalStorage-based frontend login flow
- Employee CRUD REST API
- Employee create/edit/delete from Angular
- Employee create/edit/delete from Thymeleaf pages
- Spring Security configuration
- MariaDB database connection
- Spring Data JPA persistence
- Duplicate email validation
- Bean validation for employee fields
- Global exception handling
- Swagger/OpenAPI documentation
- Data seeding for users and employees
- Selenium E2E tests

---

## Project Status

Current status:

- Spring Boot backend is working
- Angular frontend is included in this repository
- REST API is working
- Login API is working
- Employee CRUD is working
- Thymeleaf web UI is working
- Duplicate email validation is working
- Swagger documentation is working
- MariaDB persistence is working
- Selenium E2E tests are available

---

## License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for details.