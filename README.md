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

## Installation

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blog-editor.git
   cd blog-editor/backend
   ```
