# CHIMS - Comprehensive Health Information Management System

![CHIMS Logo](frontend/public/vite.svg)

## Overview

CHIMS is a robust health information management system designed to streamline healthcare operations, patient management, and program administration. The platform provides a comprehensive solution for healthcare professionals to manage client records, schedule appointments, enroll clients in healthcare programs, and track overall facility performance through intuitive dashboards.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [User Guide](#user-guide)
  - [Logging In](#logging-in)
  - [Dashboard Overview](#dashboard-overview)
  - [Navigation](#navigation)
  - [Client Management](#client-management)
  - [Appointment Management](#appointment-management)
  - [Program Management](#program-management)
  - [Enrollment Management](#enrollment-management)
- [Backend API Reference](#backend-api-reference)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Client Endpoints](#client-endpoints)
  - [Appointment Endpoints](#appointment-endpoints)
  - [Program Endpoints](#program-endpoints)
  - [Enrollment Endpoints](#enrollment-endpoints)
  - [User Endpoints](#user-endpoints)
- [Technical Architecture](#technical-architecture)
- [Support](#support)

## Features

- **Comprehensive Client Management**: Add, view, edit, and manage client health records in a secure environment.
- **Appointment Scheduling**: Schedule and manage client appointments with healthcare professionals.
- **Program Administration**: Create and manage various healthcare programs offered by your facility.
- **Client Enrollments**: Enroll clients in appropriate healthcare programs and track their progress.
- **Intuitive Dashboard**: Get insights into your operations with visual statistics and analytics.
- **Role-Based Access Control**: Different access levels for doctors, administrators, and other healthcare staff.
- **Responsive Design**: Access the platform from various devices with a fully responsive interface.

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd cema
```

2. Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install
# or with pnpm
pnpm install

# Install frontend dependencies
cd ../frontend
npm install
# or with pnpm
pnpm install
```

### Running the Application

1. Start the backend server:

```bash
cd backend
npm run dev
# or with pnpm
pnpm run dev
```

2. Start the frontend development server:

```bash
cd frontend
npm run dev
# or with pnpm
pnpm run dev
```

3. Access the application in your browser:

```
http://localhost:5173
```

## User Guide

### Logging In

1. Navigate to the login page at `http://localhost:5173` (or your deployed URL).
2. Enter the following credentials:
   - Email: `example@email.com`
   - Password: `securepassword`
3. Click "Login" to access the dashboard.

![Login Screen](frontend/public/vite.svg)

### Dashboard Overview

Upon successful login, you'll be directed to the main dashboard where you can see:

- **Summary Statistics**: Total number of clients, appointments, programs, and enrollments
- **Active Programs**: Count of currently active healthcare programs
- **Appointment Status**: Counts of scheduled, completed, and cancelled appointments
- **Enrollment Status**: Counts of active, completed, and pending enrollments

### Navigation

The side navigation menu provides access to all major sections of the application:

- **Dashboard**: Returns to the main dashboard with summary statistics
- **Clients**: Shows a list of all registered clients
- **Appointments**: Displays all scheduled appointments
- **Programs**: Lists all healthcare programs
- **Enrollments**: Shows all client program enrollments

### Client Management

#### Viewing Clients

1. Click on "Clients" in the side navigation.
2. You'll see a table listing all clients with basic information.
3. Use the search bar at the top to find specific clients by name.

#### Adding a New Client

1. From the Clients page, click the "Add New Client" button.
2. Fill in the required fields in the form:
   - Full Name
   - Email
   - Phone Number
   - Address
   - Date of Birth
   - Gender (optional)
3. Click "Save Client" to create the client record.

#### Viewing Client Details

1. From the Clients list, find the client you want to view.
2. Click "View Profile" next to their name.
3. You'll see detailed information including:
   - Personal information
   - Appointment history
   - Program enrollments

#### Important Note:

**You must create a client first before you can schedule appointments or enroll them in programs.**

### Appointment Management

#### Viewing All Appointments

1. Click on "Appointments" in the side navigation.
2. You'll see a table with all scheduled appointments.

#### Scheduling an Appointment

1. Navigate to the client's profile by clicking "View Profile" from the Clients list.
2. Click the "Schedule Appointment" button.
3. Fill in the appointment details:
   - Appointment Date
   - Description/Reason
4. Click "Schedule Appointment" to confirm.

#### Managing Appointments

From the client's profile, you can view all their appointments including the status (scheduled, completed, cancelled, or no-show).

### Program Management

#### Viewing Programs

1. Click on "Programs" in the side navigation.
2. You'll see a list of all available healthcare programs.

#### Adding a New Program

1. From the Programs page, click the "Add New Program" button.
2. Fill in the program details:
   - Name
   - Description
   - Start Date
   - End Date
   - Active Status
3. Click "Save Program" to create the new program.

### Enrollment Management

#### Viewing All Enrollments

1. Click on "Enrollments" in the side navigation.
2. You'll see a table with all client program enrollments.

#### Enrolling a Client in a Program

1. Navigate to the client's profile by clicking "View Profile" from the Clients list.
2. Click the "Enroll in Program" button.
3. Select a program from the dropdown list.
4. Set the enrollment date and status.
5. Click "Enroll in Program" to confirm.

## Authentication and API Access

### Token Authentication

All API endpoints (except login and registration) are protected and require authentication. To access these endpoints:

1. First, obtain a token by logging in through the `/api/auth/login` endpoint.
2. Include the token in the header of all subsequent requests using the following format:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

### Example API Request with Authentication

```javascript
// Example using Fetch API
const fetchClients = async () => {
  const response = await fetch("http://your-api-url/api/clients", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_JWT_TOKEN_HERE",
    },
  });

  const data = await response.json();
  return data;
};

// Example using Axios
const fetchClients = async () => {
  const response = await axios.get("http://your-api-url/api/clients", {
    headers: {
      Authorization: "Bearer YOUR_JWT_TOKEN_HERE",
    },
  });

  return response.data;
};
```

### Token Expiration

- JWT tokens have an expiration time (typically 24 hours)
- When a token expires, you will receive a 401 (Unauthorized) response
- If this happens, redirect the user to the login page to obtain a new token

## Backend API Reference

### Authentication Endpoints

#### Login

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Authentication**: Not required
- **Payload**:

```json
{
  "email": "example@email.com",
  "password": "securepassword"
}
```

- **Response**:

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "Doctor Name",
    "email": "example@email.com",
    "role": "Doctor"
  }
}
```

#### Register

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Authentication**: Not required
- **Payload**:

```json
{
  "email": "kennedymk128@gmail.com",
  "password": "12345678",
  "name": "Kimberly mainsely",
  "contact": "11111111118"
}
```

**Note**: All new users are registered with the "Doctor" role by default.

- **Response**:

```json
{
  "message": "User created successfully",
  "user": {
    "id": 2,
    "name": "Kimberly mainsely",
    "email": "kennedymk128@gmail.com",
    "role": "Doctor"
  }
}
```

### Client Endpoints

#### Get All Clients

- **URL**: `/api/clients`
- **Method**: `GET`
- **Authentication**: Required (Bearer Token)
- **Response**: List of all clients

#### Get Client by ID

- **URL**: `/api/clients/:id`
- **Method**: `GET`
- **Authentication**: Required (Bearer Token)
- **Response**: Detailed client information including appointments and enrollments

#### Create Client

- **URL**: `/api/clients`
- **Method**: `POST`
- **Authentication**: Required (Bearer Token)
- **Payload**:

```json
{
  "fullname": "John Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "address": "123 Main St, City, Country",
  "dob": "1990-01-15",
  "gender": "male"
}
```

- **Response**: Created client object

#### Update Client

- **URL**: `/api/clients/:id`
- **Method**: `PATCH`
- **Authentication**: Required (Bearer Token)
- **Payload**: Fields to update (any of the fields from create client)
- **Response**: Updated client object

#### Delete Client

- **URL**: `/api/clients/:id`
- **Method**: `DELETE`
- **Authentication**: Required (Bearer Token)
- **Response**: Confirmation message

### Appointment Endpoints

#### Get All Appointments

- **URL**: `/api/appointments`
- **Method**: `GET`
- **Authentication**: Required (Bearer Token)
- **Response**: List of all appointments

#### Create Appointment

- **URL**: `/api/appointments`
- **Method**: `POST`
- **Authentication**: Required (Bearer Token)
- **Payload**:

```json
{
  "clientId": 2,
  "doctorId": 3,
  "appointmentdate": "2025-05-15T14:30:00Z",
  "description": "Initial consultation",
  "status": "scheduled"
}
```

- **Response**: Created appointment object

#### Update Appointment

- **URL**: `/api/appointments/:id`
- **Method**: `PATCH`
- **Authentication**: Required (Bearer Token)
- **Payload**: Fields to update (any of the fields from create appointment)
- **Response**: Updated appointment object

### Program Endpoints

#### Get All Programs

- **URL**: `/api/programs`
- **Method**: `GET`
- **Authentication**: Required (Bearer Token)
- **Response**: List of all programs

#### Create Program

- **URL**: `/api/programs`
- **Method**: `POST`
- **Authentication**: Required (Bearer Token)
- **Payload**:

```json
{
  "name": "Diabetes Management",
  "description": "Comprehensive program for managing diabetes through diet, exercise, and medication.",
  "startdate": "2025-05-01",
  "enddate": "2025-11-30",
  "isActive": true
}
```

- **Response**: Created program object

#### Update Program

- **URL**: `/api/programs/:id`
- **Method**: `PATCH`
- **Authentication**: Required (Bearer Token)
- **Payload**: Fields to update (any of the fields from create program)
- **Response**: Updated program object

### Enrollment Endpoints

#### Get All Enrollments

- **URL**: `/api/enrollments`
- **Method**: `GET`
- **Authentication**: Required (Bearer Token)
- **Response**: List of all enrollments

#### Create Enrollment

- **URL**: `/api/enrollments`
- **Method**: `POST`
- **Authentication**: Required (Bearer Token)
- **Payload**:

```json
{
  "clientId": 2,
  "programId": 1,
  "enrollmentdate": "2025-05-10",
  "status": "active"
}
```

- **Response**: Created enrollment object

#### Update Enrollment

- **URL**: `/api/enrollments/:id`
- **Method**: `PATCH`
- **Authentication**: Required (Bearer Token)
- **Payload**: Fields to update (status, etc.)
- **Response**: Updated enrollment object

### User Endpoints

#### Get All Users

- **URL**: `/api/users`
- **Method**: `GET`
- **Authentication**: Required (Bearer Token)
- **Response**: List of all users (doctors, admins)

## Technical Architecture

CHIMS is built with modern technologies:

- **Frontend**: React, TypeScript, Tailwind CSS, React Router, Redux Toolkit
- **Backend**: Node.js, Hono.js, PostgreSQL, Drizzle ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel (frontend) / Your preferred hosting (backend)

## Support

For additional support or questions, please contact the system administrator(Kennedy) or refer to the internal documentation.

---

© 2025 CHIMS - Comprehensive Health Information Management System. All rights reserved.
