# Blog Editor Application

## Overview

Blog Editor is a full-stack web application that allows users to write, save drafts, publish, and manage blogs seamlessly. It features secure authentication with JWT, a responsive and dynamic frontend with React, and robust backend services using Spring Boot.

---

## Tech Stack

- **Backend:**

  - Spring Boot (REST API)
  - Lombok (reduces boilerplate code)
  - JWT (JSON Web Tokens for authentication)
  - Spring Security (authentication and authorization)
  - JPA/Hibernate (ORM for MySQL database)
  - MySQL (database)

- **Frontend:**
  - React (UI library)
  - Redux (state management)
  - Formik (form management)
  - Yup (form validation)
  - React Toastify (notifications)
  - Tailwind CSS (utility-first CSS framework)
  - DaisyUI (component library built on Tailwind CSS)

---

## Features

### Backend

- User registration with password encryption
- User authentication using JWT tokens
- Role-based blog operations (users can only edit/delete their own blogs)
- Create, save, and update draft blogs
- Publish blogs with proper status management (Draft/Published)
- Fetch all blogs or a single blog by ID
- Delete blogs with authorization checks

### Frontend

- Responsive UI with Tailwind CSS & DaisyUI
- User registration and login forms with validation via Formik and Yup
- Redux for global state management of user and blog data
- Blog creation/editing form supporting draft saving and publishing
- Real-time notifications with React Toastify
- Blog listing, viewing, editing, and deletion functionality

---

## Backend Overview

The backend exposes RESTful APIs for managing users and blogs:

- **User Management:**

  - Register new users
  - Authenticate existing users and issue JWT tokens
  - Validate email uniqueness

- **Blog Management:**
  - Save or update blog drafts
  - Publish blogs
  - Retrieve all blogs or specific blog by ID
  - Delete blogs with permission checks

Security is handled using JWT tokens, which the frontend sends with requests to protected routes.

---

## Frontend Overview

The React frontend includes:

- User registration and login pages with Formik/Yup validation
- Protected routes based on authentication state
- Blog editor with input fields for title, content, and tags
- Buttons for saving drafts or publishing blogs
- Blog listing page with options to edit or delete owned blogs
- Toast notifications for success/error messages

State management is done using Redux to keep user and blog data consistent across components.

---

### Key Features

- **User Registration and Authentication**  
  Secure user signup and login powered by JWT authentication, ensuring safe and authorized access to blogging functionalities.

- **Blog Drafting and Publishing**  
  Users can save blog drafts, update existing drafts, and publish blogs with ease.

- **Role-Based Access Control**  
  Only the blog owner can edit or delete their blogs, ensuring data security and integrity.

- **Rich Blog Content Management**  
  Support for rich text content, tagging, and content validation to help organize blogs effectively.

- **Responsive Frontend UI**  
  Built with React, Redux, Tailwind CSS, and DaisyUI for a sleek, modern, and mobile-friendly user interface.

- **Form Management and Validation**  
  Uses Formik and Yup for robust form handling and validation, improving user experience and data quality.

- **Real-Time Notifications**  
  Toastify integration provides instant feedback and alerts to users on actions like save, publish, or error messages.

### Technical Highlights

- **Backend:** Spring Boot with REST APIs, JWT-based security, and database persistence using JPA and MySQL.
- **Frontend:** React with Redux for state management, Formik/Yup for forms, Tailwind CSS and DaisyUI for styling.
- **Security:** JWT tokens for secure authentication and authorization.
- **Development Tools:** Lombok to reduce boilerplate code on the backend, improving code clarity and efficiency.

---

This project serves as both a personal blogging platform and a demonstration of integrating modern frontend and backend technologies in a cohesive manner.

