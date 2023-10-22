# MovieReel Database

Welcome to the MovieReel Database API documentation. This API provides access to a comprehensive movie database, allowing you to manage movie-related information. With well-defined endpoints, it simplifies the process of retrieving, creating, updating, and deleting movie records. Users can also interact with their profiles, making it a versatile tool for movie enthusiasts and administrators.

**Access the live API**: [MovieReel API - Heroku](https://movie-sringtho-8352b0c3e296.herokuapp.com)

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Contact](#contact)

## Introduction

The MovieReel Database API offers a wide range of functionalities for managing movie records and user profiles. Whether you want to create new movies, update existing ones, or interact with your user account, this API has you covered.

## Getting Started

Before you can start using the MovieReel Database API, you need to set up your environment and configure the necessary parameters. Here's how to get started:

## Installation

### Prerequisites

Ensure you have MySQL and nodejs installed on your local machine.

### Installation Steps
#### Clone the Repository
- Open your terminal or command prompt.
- Navigate to the directory where you want to install the API.
- Clone the repository from GitHub.

``` bash
git clone https://github.com/ringtho/movielist-backend.git
```

#### Install Dependencies
- Change your current directory to the project folder and install project dependencies

``` bash
cd movielist-backend
npm install
```

#### Configure MySQL Database
- Create a MySQL database for the project.
- Update the database configuration in the project. Create a .env file and update the following values with your MySQL database information:
``` bash
DBHOST=localhost
DBUSER=your_mysql_username
DBPASSWORD=your_mysql_password
DBNAME=your_database_name
```

#### Start the server

``` bash
npm start
```

#### Access the API
- The API should now be running locally. You can access it at the following URL:

``` bash
http://localhost:5050/api/v1
```

Now you have the MovieReel Database API running on your local machine, connected to your MySQL database. You can use this local environment for testing and development.

## Usage

The MovieReel Database API offers a range of endpoints to interact with the system. To make requests to these endpoints, you need to understand the API's authentication mechanism.

## Endpoints

### Auth
- **/auth/login**: Log in to your account.
- **/auth/register**: Register a new user account.

### Users
- **/user**: Retrieve user details.
- **/user/update-password**: Update the user's password.
- **/user/update**: Update user details and profile image.

### Movies
- **/movies**: Create a new movie record.
- **/movies?page={pageNo}&&size={numberOfRecords}**: Retrieve movies with pagination.
- **/movies/all**: Get movies created by the user.
- **/movies/{id}**: Retrieve a movie by its ID.
- **/movies/{id}**: Update a movie record.
- **/movies/{id}**: Delete a movie.
- **/movies/favorite**: Retrieve favorite movies.
- **/movies/{id}/favorite**: Update the favorite status of a movie.
- **/movies/{id}/image**: Delete a movie's thumbnail image.

## Authentication

To access protected routes, the API uses bearer token authentication. You need to include a valid JSON Web Token (JWT) in the `Authorization` header of your requests.

#### Example:

```http
GET /api/v1/user
Authorization: Bearer your-jwt-token
```

##### Register a new user
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "your-password"
}
```

## API Documentation

For detailed information on each endpoint, request and response examples, and authentication, please refer to the [API Documentation](https://movie-sringtho-8352b0c3e296.herokuapp.com/api-docs/).

## Contributing

We welcome contributions from the community. If you'd like to improve the API, fix issues, or add new features, please fork the repository at [GitHub](https://github.com/ringtho/movielist-backend), create a branch, and open a pull request.

## Contact

If you have any questions or need further assistance, feel free to contact:

- **Smith Ringtho**
  - Email: sringtho@gmail.com

Happy movie management with MovieReel Database!
