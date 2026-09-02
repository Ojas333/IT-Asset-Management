# IT Asset & Service Management System

> Enterprise full-stack platform for managing IT assets, service requests, and IT operations through a centralized web dashboard.

[![Java](https://img.shields.io/badge/Java-21-orange)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Backend-brightgreen)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-blue)](https://www.mysql.com/)
[![REST API](https://img.shields.io/badge/API-REST-02569B)](https://restfulapi.net/)

A full-stack IT asset management application designed to help organizations track hardware assets, assignments, service requests, and operational status from a centralized dashboard.


# IT Asset & Service Management System

A full-stack enterprise web application for managing IT assets, tracking asset allocation, monitoring asset status, and handling employee service requests through a centralized dashboard.

Built using **React.js, Spring Boot, Java, REST APIs, and MySQL**.

---

## 🚀 Project Overview

Organizations manage laptops, desktops, monitors, and other IT equipment across multiple employees and departments. Managing these assets manually can make it difficult to track ownership, availability, maintenance, and support requests.

The **IT Asset & Service Management System** provides a centralized platform to manage IT operations efficiently.

### The system allows administrators to:

* Manage IT assets
* Track asset allocation
* Monitor asset availability and status
* Create and manage service requests
* Search and filter records
* View operational statistics through a dashboard
* Perform CRUD operations through REST APIs

---

## ✨ Key Features

### 📊 Dashboard

* Total assets
* Available assets
* Assigned assets
* Assets under maintenance
* Total service requests
* Open requests
* In-progress requests
* Resolved requests
* Asset status overview
* Service request tracking

### 💻 Asset Management

* Add new IT assets
* View asset inventory
* Search assets
* Filter assets
* Edit asset information
* Delete assets
* Assign assets to employees
* Track asset status

### 🎫 Service Request Management

* Create service requests
* View service requests
* Track request status
* Update request status
* Monitor open and resolved requests

### 🔐 Administrative Dashboard

* Admin login interface
* Enterprise-style dashboard
* Sidebar navigation
* Responsive UI
* Centralized IT operations management

---

## 🛠️ Technology Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Vite
* Axios

### Backend

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* Hibernate
* REST APIs
* Maven

### Database

* MySQL

### Tools

* Git
* GitHub
* Visual Studio Code
* Postman
* MySQL Workbench

---

## 🏗️ System Architecture

```text
┌─────────────────────────────┐
│       React Frontend        │
│                             │
│ Dashboard                   │
│ Asset Management            │
│ Service Requests            │
│ Admin Interface             │
└──────────────┬──────────────┘
               │
               │ REST API / JSON
               ▼
┌─────────────────────────────┐
│      Spring Boot API        │
│                             │
│ Controllers                 │
│ Services                    │
│ Repositories                │
│ JPA / Hibernate             │
└──────────────┬──────────────┘
               │
               │ JDBC
               ▼
┌─────────────────────────────┐
│           MySQL             │
│                             │
│ Assets                      │
│ Service Requests            │
│ Departments                 │
│ Asset Status                │
└─────────────────────────────┘
```

---

## 📁 Project Structure

```text
IT-Asset-Management/
│
├── backend/
│   └── asset-management/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/
│       │   │   │   └── asset_management/
│       │   │   │       ├── config/
│       │   │   │       ├── controller/
│       │   │   │       ├── entity/
│       │   │   │       ├── repository/
│       │   │   │       └── service/
│       │   │   └── resources/
│       │   │       └── application.properties
│       │   └── test/
│       └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── Login.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 🗄️ Database

The application uses **MySQL** for relational data storage.

### Database

```text
it_asset_management
```

### Core Entities

* Asset
* Service Request
* Department
* Asset Status

The application uses **Spring Data JPA and Hibernate** for database interaction and object-relational mapping.

---

## 🔌 REST API

The Spring Boot backend runs on:

```text
http://localhost:8080
```

API base path:

```text
http://localhost:8080/api
```

### Asset APIs

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| GET    | `/api/assets`      | Retrieve all assets |
| POST   | `/api/assets`      | Create an asset     |
| PUT    | `/api/assets/{id}` | Update an asset     |
| DELETE | `/api/assets/{id}` | Delete an asset     |

### Service Request APIs

| Method | Endpoint                     | Description               |
| ------ | ---------------------------- | ------------------------- |
| GET    | `/api/service-requests`      | Retrieve service requests |
| POST   | `/api/service-requests`      | Create a service request  |
| PUT    | `/api/service-requests/{id}` | Update a service request  |

---

## ⚙️ Installation & Setup

### Prerequisites

Install the following:

* Java JDK 21
* Maven
* Node.js
* npm
* MySQL
* Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/Ojas333/IT-Asset-Management.git
```

```bash
cd IT-Asset-Management
```

---

### 2. Configure MySQL

Create the database:

```sql
CREATE DATABASE it_asset_management;
```

Configure the database connection in:

```text
backend/asset-management/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/it_asset_management
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

**Never commit your actual database password to GitHub.**

---

### 3. Start the Backend

Open a terminal:

```bash
cd backend/asset-management
```

Run:

```bash
mvn spring-boot:run
```

The backend will run on:

```text
http://localhost:8080
```

---

### 4. Start the Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

## 🔄 Application Flow

```text
Administrator
      │
      ▼
React Dashboard
      │
      ▼
Axios HTTP Requests
      │
      ▼
Spring Boot REST API
      │
      ▼
Service Layer
      │
      ▼
Spring Data JPA / Hibernate
      │
      ▼
MySQL Database
```

---

## 🔍 Search & Filtering

The application provides search and filtering functionality for efficiently locating:

* IT assets
* Asset identifiers
* Assigned employees
* Service requests
* Request information

---

## 🧪 Testing

The backend APIs can be tested using **Postman** or browser/API requests.

### Health Check

```text
GET http://localhost:8080/api/health
```

Example response:

```json
{
  "status": "UP",
  "message": "Asset Management API is running"
}
```

---

## 🔒 Security Considerations

For a production deployment, the system can be enhanced with:

* JWT authentication
* Role-based access control
* Password hashing
* Environment variables
* API authorization
* HTTPS
* Input validation
* Audit logging

---

## 🚀 Future Enhancements

* JWT authentication and role-based authorization
* Employee/user management
* Asset assignment history
* Asset maintenance history
* Email notifications
* Automated service request assignment
* File attachments
* Advanced reporting
* Power BI integration
* Docker containerization
* Cloud deployment
* CI/CD pipeline
* Audit logs
* Real-time notifications

---

## 💡 Learning Outcomes

Through this project, I gained practical experience in:

* Full-stack web development
* React.js
* Spring Boot
* REST API development
* Spring Data JPA
* Hibernate
* MySQL
* CRUD operations
* Frontend-backend integration
* HTTP and JSON communication
* Git and GitHub
* Enterprise application architecture

---

## 👩‍💻 Author

**Ojas V**

B.Tech – Computer Science & Engineering (IoT)

### Areas of Interest

* Full-Stack Development
* Java & Spring Boot
* React.js
* SQL & Databases
* IoT
* Software Engineering

---

## ⭐ Project

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**GitHub Repository:**
https://github.com/Ojas333/IT-Asset-Management
