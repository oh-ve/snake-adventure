# 🐍 SNAKE ADVENTURE

Try it [here](https://snake-adventure.netlify.app/).

## Overview

"Snake Adventure" is a web-based game inspired by the classic arcade game Snake. Players control a snake as it navigates the screen, collecting food items to grow longer. However, with each food item eaten, the snake accelerates and grows, increasing the challenge of avoiding collisions with walls and its own tail. "Snake Adventure" offers multiple levels with different landscapes.

The game is built using React.js for interactive gameplay, while the back-end, powered by Node.js and Express.js, handles the storage of high scores in a PostgreSQL database.

### Key Functionalities and Implementation

- Canvas Setup

The game is played on an HTML canvas element.
The canvas size is set to 1200x600 pixels.

- State Management

The game uses React's useState hook to manage state variables like snake, food, score, and gameStarted.

- Dynamic Backgrounds

The game features different backgrounds for each level (e.g., jungle, underwater).
Backgrounds are managed using an object where each key corresponds to a level, and its value is an imported image file.

- Snake Mechanics

The snake is represented as an array of objects, each object being a segment of the snake.
Movement is achieved by adding a new segment at the front and removing one from the back, creating an illusion of motion.

- Food Generation

Food is randomly placed on the canvas.
The position is calculated to align with the grid defined by the canvas size and cell size.

- Collision Detection

The game checks for collisions with the canvas borders and the snake itself.
Collision results in the game over condition.

- Game Speed

The game's speed is managed through a dynamic function that decreases the interval between frame updates as the score increases.

- User Input Handling

Arrow key inputs are used to change the direction of the snake.
The useEffect hook listens for keydown events and updates the snake's direction accordingly.

- Rendering

The game loop is managed using setInterval, which calls the draw function at a rate dependent on the game's current speed.
The canvas is redrawn each frame to update the positions of the snake and food.

- Game Over Handling

When the game is over, the player can enter their name, and their score is submitted.
The game resets the snake position, direction, and score for a new game.

- High Scores

The game tracks and displays high scores achieved by players.
High scores are stored in a PostgreSQL database and displayed dynamically, with the player's latest score highlighted.

### Next steps

In the next steps, the game is planned to be made more complex by varying the gameplay mechanics for each level and introducing obstacles like walls, making each level slightly different. To accommodate this in the high score list, high scores are intended to be displayed by levels. For this purpose, a "level" column has already been created in the database.

## Intallation and setup

Follow these steps to install and set up "Snake Adventure" on your local machine:

### Prerequisites

Before you begin, ensure you have the following installed:

Node.js (which includes npm)  
PostgreSQL for the database

### Cloning the Repository

Open your command line interface. Navigate to the directory where you want to clone the repository.
Run the following command to clone the repository:

```bash
git clone https://github.com/oh-ve/snake-adventure.git
```

### Setting Up the Database

To work with the "Snake Adventure" game and store high scores, you'll need a PostgreSQL database:

Start your PostgreSQL service.
Create a new database for the game's high scores.

```bash
# Start PostgreSQL Service
# On Linux (Ubuntu/Debian):
sudo service postgresql start

# On macOS:
brew services start postgresql

# On Windows, you can start the service from the PostgreSQL installer.

# Create a New Database
# Log in to PostgreSQL (you might need to provide your password):
psql -U postgres

# Once logged in, you can create a new database (replace "mydatabase" with your desired name):
CREATE DATABASE snake-scores;

# Exit the PostgreSQL shell:
\q
```

#### Database Model

Below is the database model that outlines the structure of the database tables:

_Scores Table_

- `id` (Serial): A unique identifier for each high score entry.
- `player_name` (Text): The name of the player who achieved the high score.
- `score` (Integer): The player's score in the game.
- `level` (Text): The level at which the high score was achieved.
- `created_at` (Timestamp): The timestamp when the high score entry was created.

To set up the database structure, you can create the `scores` table manually using the following SQL commands:

```sql
-- Log in to your PostgreSQL database (replace "username" and "database_name" with your credentials)
psql -U username -d database_name

-- Create the "scores" table
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    player_name TEXT NOT NULL,
    score INTEGER NOT NULL,
    level TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Exit the PostgreSQL shell
\q
```

#### Environmental variables

The following environmental variables are needed to configure the database connection:

DB_USER: This variable represents the database user or username required for authentication when connecting to the database.

DB_HOST: It specifies the database host or server address where the PostgreSQL database is hosted.

DB_NAME: This variable defines the name of the database itself. It identifies which database the application should interact with.

DB_PASSWORD: The database password is stored in this variable. It's a secret key used for secure access to the database.

DB_PORT: The port number on which the database server is running is specified in this variable. It ensures that the application communicates with the correct port.

A sample.env file is provided. When setting up your "Snake Adventure" project, make sure to replace the variables with your specific database connection details and rename the file to .env. These values are essential for establishing a successful connection to the database, enabling your game to store and retrieve high scores seamlessly.

#### Starting the database server

Cd into the scores folder and start the server.

```bash
cd snake-adventure/scores
npm run dev
```

#### API Endpoints

The following API endpoints are available for interacting with the "Snake Adventure" backend:

- `GET /scores`: Retrieve the high scores from the database. This endpoint provides a list of high scores sorted by score value in descending order.

- `POST /submit-score`: Submit a new high score to the database. To submit a score, send a POST request to this endpoint with the following JSON data:

  ```json
  {
    "player_name": "YourName",
    "score": 1000,
    "level": "LevelName"
  }
  ```

### Setting up the Frontend

Navigate to the cloned repository's "/gameplay" directory and install the required Node.js modules:

```bash
cd snake-adventure/gameplay
npm install
```

#### Required npm packages

In addition to the prerequisites mentioned above, you'll need to install the `react-router-dom` package. This package is essential for handling routing within the "Snake Adventure" application. To install it, you can run the following command in your project directory:

```bash
npm install react-router-dom
```

### Starting the Game

Once all dependencies are installed, you can start the game using:

```bash

npm start

```

🐍 **Happy playing!** 🐍
