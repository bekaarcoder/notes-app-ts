# MERN Note Taking App

![GitHub last commit](https://img.shields.io/github/last-commit/bekaarcoder/notes-app-ts)
![GitHub stars](https://img.shields.io/github/stars/bekaarcoder/notes-app-ts?style=social)

## Overview

A full-stack **Note Taking application** built using the MERN (MongoDB, Express.js, React, Node.js) stack. This application allows users to create, read, update, and delete notes with user authentication and password reset functionality. The frontend is developed with Vite, React Router, React Context API, react-hook-form, and Bootstrap for a responsive and intuitive user interface. The backend utilizes Express.js with mongoose for seamless database connectivity. Nodemailer is integrated for secure password reset features.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Usage](#usage)

## Features

-   **CRUD Operations:** Create, read, update, and delete notes.
-   **User Authentication:** Utilizes express-session for secure user authentication.
-   **Password Reset:** Nodemailer integration for secure password reset functionality.
-   **State Management (React Context API)** Handles the state of the logged-in user for a seamless user experience.
-   **Responsive UI:** Developed with Bootstrap for a seamless user experience.

## Technologies Used

-   **Frontend:**

    -   Vite
    -   React
    -   React Router
    -   react-hook-form
    -   Bootstrap

-   **Backend:**
    -   Node.js
    -   Express.js
    -   MongoDB with Mongoose
    -   Nodemailer

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/bekaarcoder/notes-app-ts.git
    ```

2. Install dependencies:

    ```bash
    # Frontend
    cd frontend
    npm install

    # Backend
    cd backend
    npm install
    ```

3. Setup MongoDB:

-   Create a MongoDB Atlas account or set up a local MongoDB database.
-   Update the MongoDB URI in backend/.env with your connection string.

4. Create a `.env` file in the `backend` folder

    ```
    MONGO_CONNECTION_STRING=<mongo_uri_string>
    PORT=<your_port_here>
    SESSION_SECRET=<your_secret_here>
    ```

5. Run the application:

    ```bash
    # Frontend
    cd frontend
    npm run dev

    # Backend
    cd backend
    npm start
    ```

6. Open http://localhost:5173 in your browser to access the application.

## Usage

-   Create an account by signing up.
-   Start creating and managing your notes.
