# Opulent Task

Opulent Task is a task manager web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and JWT (JSON Web Tokens) for authentication.

## Features

- User registration and login using JWT authentication
- Create, update, and delete tasks
- Task filtering and sorting
- User-friendly interface

## Prerequisites

Before running the application, make sure you have the following prerequisites installed on your local machine:

- Node.js 
- MongoDB

## Getting Started

To run the Opulent Task app on your local machine, follow these steps:

1. Clone the repository:
  `` git clone https://github.com/NoahCron/Task-Manager-MERN.git ``
   
2. Navigate to the project dir
``   cd Task-Manager-MERN ``
   
3. Install the dependencies for both the frontend and backend

``   cd frontend
   npm install ``
   
``   cd backend
   npm install ``
   
4. Setup your env variables. 
``   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret> ``
 
5. Start the servers
   
  ``  a. Backend
     cd backend
     npm run dev ``
    
     
``    b. Frontend
     cd frontend
     npm start  ``
   
6. Open your web browser and visit http://localhost:3000 to access the Opulent Task app.
7. Swagger Dosc is available in http://localhost:4000/api-docs

 
## Project Structure
The project structure follows a standard MERN stack architecture:

backend/server.js: Entry point for the backend server.
backend/routes/: Contains the API routes for task management and authentication.
backend/controllers/: Handles the logic for different API routes.
backend/models/: Defines the MongoDB schemas.
frontend/: Contains the frontend React.js code.
frontend/src/components/: Contains reusable React components.
frontend/src/pages/: Contains the main pages for the app.
frontend/src/App.js: Entry point for the frontend React app.

App Example: 
![image](https://github.com/NoahCrown/Task-Manager-MERN/assets/91674419/c80c3d68-b7c2-4252-9aef-b62d57453b99)

   
