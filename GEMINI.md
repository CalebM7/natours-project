
# Gemini Project Configuration

This file provides context to the Gemini AI assistant to ensure it can effectively contribute to this project.

## Project Overview

- **Name:** Natours
- **Description:** A Node.js, Express, and MongoDB application for a fictional tour company.
- **Primary Language:** JavaScript (Node.js)

## Key Files & Directories

- **`app.js`**: The main application file where Express is configured and middleware is mounted.
- **`server.js`**: The entry point of the application, responsible for starting the server.
- **`routes/`**: Contains the route definitions for different parts of the API (e.g., `tourRoutes.js`, `userRoutes.js`).
- **`controllers/`**: Holds the controller functions that handle business logic for each route.
- **`models/`**: Defines the Mongoose schemas and models for the database.
- **`utils/`**: Contains utility functions and classes used across the application.
- **`public/`**: Static assets served to the client (CSS, images, etc.).
- **`dev-data/`**: Development data and import scripts.

## Commands

- **`npm start`**: Starts the development server using `nodemon`.
- **`npm run start:prod`**: Starts the production server.

## Coding Conventions

- **Style:** Follow the rules defined in `.eslintrc.json` and `.prettierrc`.
- **Architecture:** The project follows a Model-View-Controller (MVC) architecture.
- **Naming:**
  - Files are camelCase (e.g., `tourController.js`).
  - Variables and functions are camelCase.
  - Mongoose models are PascalCase (e.g., `Tour`).
- **Dependencies:** Use `npm` to manage dependencies. Add new dependencies to `package.json`.

## How to Contribute

1.  Create a new feature branch.
2.  Add or modify routes in the `routes/` directory.
3.  Implement the corresponding controller logic in the `controllers/` directory.
4.  If necessary, create or update Mongoose models in the `models/` directory.
5.  Ensure all code passes the linter.
