#Contact Management App#
This project is a full-stack contact management application built using React, Node.js, and MySQL.
The app allows users to create, view, update, and delete contacts. This README provides setup instructions,
a brief project overview, and technical decisions made during development.

Project Overview:
The contact management app consists of the following parts:

Frontend: Built with React, it provides a simple and responsive UI for managing contacts. Axios is used to communicate with the backend.
Backend: Developed using Node.js and Express.js, it serves as the API layer for CRUD operations on contacts.
Database: MySQL is used for storing contact information. The schema is simple, with a single contacts table for managing user data.
Major Technical Decisions
React was chosen for its efficiency in creating dynamic UIs and ease of managing state.
Axios is used to handle HTTP requests between the frontend and backend.
Node.js and Express are used for building a lightweight REST API to handle backend operations.
MySQL is the database of choice for its robust data management features and ease of integration with Node.js.

Setup Instructions:
Follow these steps to set up and run the project locally.

Prerequisites:
Ensure that you have the following installed:

Node.js (version 12 or above)
MySQL (any recent version)

1. Clone the Repository
Clone this repository to your local machine and navigate to the project directory:

git clone <repository-url>
cd <project-directory>

2. Set Up the Database
Create a new MySQL database:

CREATE DATABASE contacts_db;
Create the contacts table by running the following SQL script:

USE contacts_db;

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL
);

3. Configure Environment Variables
In the backend directory, create a .env file to set up database connection details and server configuration. Add the following:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=contacts_db
Replace your_password with your MySQL password.

5. Install Dependencies
Backend
Navigate to the backend directory and install the required packages:

cd backend
npm install

Frontend
Navigate to the frontend directory and install the required packages:

cd ../frontend
npm install

5. Start the Servers
Backend Server
Start the backend server from the backend directory:

cd backend
node index.js

This starts the backend server at http://localhost:5000.

Frontend Server
Start the React frontend server from the frontend directory:

cd ../frontend
npm start

This starts the frontend on http://localhost:3000.

6. Testing the Application
Open your browser and go to http://localhost:3000 to view and use the application.
You can also test the API endpoints directly (e.g., using Postman).

Application Structure:
Frontend (React)
App.js: The main component that renders the contact management interface and handles form submissions.
Axios: Used for making HTTP requests to the backend server.
State Management: React's useState and useEffect hooks are used to manage the component state and lifecycle.
Backend (Node.js + Express)
index.js: The main entry point of the server. Defines the routes for handling contact operations.

API Routes:
GET /contacts: Fetch all contacts.
POST /contacts: Add a new contact (requires name, email, and phone in the request body).
PUT /contacts/:id: Update an existing contact by ID.
DELETE /contacts/:id: Delete a contact by ID.

Database (MySQL):
The contacts table contains the following fields:

id (INT): Primary key, auto-incremented for each new contact.
name (VARCHAR): Name of the contact.
email (VARCHAR): Email of the contact.
phone (VARCHAR): Phone number of the contact.

Technical Challenges:
Handling CORS: Since the frontend and backend are on different ports, CORS (Cross-Origin Resource Sharing) had to be configured in the backend.
Error Handling: Basic error handling is implemented on both the client and server sides for network errors, validation errors, etc.
Data Validation: Minimal validation is added to ensure required fields like name, email, and phone are not empty when creating or updating contacts.

Acknowledgments:
This project was developed as part of an SDE internship assignment to demonstrate skills in full-stack development.

