# Candidate_Board [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This is a full-stack Kanban board application with secure authentication using JSON Web Tokens (JWT). Users can log in, manage tasks, and view tickets in a Kanban-style interface.

---

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Features](#Features)
- [Usage](#usage)
- [Deployment](#deployment)
- [License](#license)
- [Contribution Guidelines](#contribution-guidelines)
- [Questions](#questions)

---

## Features

- Secure login and logout using JWT.
- Persistent authentication with tokens stored in local storage.
- Task management with filtering and sorting capabilities.
- Responsive and user-friendly interface.

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd kanban_Board
   ```

2. Install dependencies:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

3. Set up the `.env` file in the `server` directory:
   ```properties
   DB_NAME='kanban_db'
   DB_USER='your_db_user'
   DB_PASSWORD='your_db_password'
   JWT_SECRET_KEY='your_secret_key'
   ```

4. Seed the database:
   ```bash
   cd server
   npm run seed
   ```

5. Start the development server:
   ```bash
   cd server && npm run dev
   cd ../client && npm run dev
   ```

---

## Usage

1. Create a `.env` file in the `environment` folder with the following content:
   ```
   VITE_GITHUB_TOKEN=your_personal_access_token
   ```
   Replace `your_personal_access_token` with your GitHub Personal Access Token.

2. Start the development server:
   ```sh
   npm run dev
   ```

3. Open the application in your browser at `http://localhost:5173`.

---

## Deployment

The application is deployed on Render. You can access it at:(https://kanban-board-g5ej.onrender.com/)

see this screenshots of the app:
![Home](https://1drv.ms/i/c/3b216777a5c674e6/EYn7JD3eQsZHke6MGKqEDKUBsIP1mvV7i5AuKlWUfXalFg?e=rPxegP)
![Login](https://1drv.ms/i/c/3b216777a5c674e6/EeoVLjNHWtNJtp6fm0WMRt4BMPjoq9T0R32MiDss0T0xaA?e=FMgNDY)
![Kanban](https://1drv.ms/i/c/3b216777a5c674e6/EZ2reE4ijb5AnJttqx6Ga0sB_ehU8sfIdvGLjxkvWspheA?e=EO5Xgp)
---

## License 
Project license: MIT

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Contribution Guidelines

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so.

---

## Test Instructions

Tests will be added in the future.

## Questions
If you have any questions, please feel free to contact me at gamalmubarak87@gmail.com. You can also find more of my work at [gamalmubarak](https://github.com/gamalmubarak).