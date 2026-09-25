# CRUD - User List

## Project Screens

### 1 - Dashboard

> When the page is loaded

![Dashboard](https://i.imgur.com/mBZQ753.png)

> When searching for a user

![Dashboard when searching](https://i.imgur.com/34jh75I.png)

### 2 - Registration

> User registration form

![Registration](https://i.imgur.com/UjpfPiH.png)

### 3 - User Page

> Page to view information about a specific user

![User Page](https://i.imgur.com/CXOPOAq.png)

### 4 - Editing

> User editing form

![User Editing](https://i.imgur.com/466Z4LE.png)

## Technologies Used

* ReactJS
* TypeScript
* PHP
* Database (MySQL)
* Styled-Components
* MVC Architecture
* REST API development using Slim Framework
* Advanced forms with React Hook Form and Zod
* API consumption with React Query

## Features

* [x] User registration with input validation
* [x] View all registered users from the database on the dashboard
* [x] Search for a specific user
* [x] View information about a specific user by ID
* [x] Delete a user
* [x] Update user information

## How to Run

Prerequisites (You can configure a Docker environment to run the project)

* Node.js
* PHP 7.4.26
* MySQL
* Composer

First, clone this repository:

```bash
    git clone https://github.com/TeuSoares/crud_users.git
```

Setting up the server 👇

1. Access MySQL, create a new database, and import the table located inside the `database` folder.

2. Install the dependencies inside the `server` folder:

```bash
    cd server
```

```bash
    composer install
```

3. Create a `.env` file inside the `server` folder with the database information:

```
DB_HOST = "localhost"
DB_NAME = <nomeDoBanco>
DB_USERNAME = "root"
DB_PASSWORD = ""
```

4. Run the server:

```bash
    composer run server
```

Starting the project 👇

1. Access the `web` folder:

```bash
    cd web
```

2. Install the dependencies:

```bash
    npm install
```

3. Start the project:

```bash
    npm run dev
```

## Project Presentation Video

https://user-images.githubusercontent.com/70549313/233874112-c15e639d-674c-4f01-9b3b-508a9595f716.mp4

## Author

* **Mateus Soares** [LinkedIn](https://www.linkedin.com/in/mateus-soares-santos/)

## Version

1.0.0
