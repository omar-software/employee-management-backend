# Employee Management Backend

Spring Boot backend API for Employee Management System.

This backend works with an Angular frontend.

---

## Technologies

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- MariaDB
- Thymeleaf
- Swagger / OpenAPI
- Maven

---

## Backend URL

The backend runs on:

```text
http://localhost:8080
```

---

## Frontend URL

The Angular frontend runs on:

```text
http://localhost:4200
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

Database configuration is inside:

```text
src/main/resources/application.properties
```

Make sure MariaDB is running before starting the backend.

---

## Run Backend

From the backend project folder, run:

```powershell
.\mvnw.cmd spring-boot:run
```

Backend should start on:

```text
http://localhost:8080
```

---

## Build Project

```powershell
.\mvnw.cmd clean package
```

---

## Project Structure

```text
src/main/java/com/omar/employeemanagement
```

Important packages:

```text
controller
service
repository
model
security
config
exception
user
```

---

## Main Features

- Login API
- Employee CRUD REST API
- Thymeleaf employee pages
- Spring Security configuration
- MariaDB database connection
- Duplicate email validation
- Global exception handling
- Swagger API documentation
- Data seeding for users and employees

---

## Related Repository

Frontend repository:

```text
https://github.com/omar-software/employee-management-frontend
```

---

## Project Status

Current status:

- Spring Boot backend is working
- REST API is working
- Login API is working
- Employee CRUD is working
- Duplicate email validation is working
- Swagger documentation is working
- Angular frontend integration is working

## License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for details.