const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(bodyParser.json());

app.post("/submit-score", async (req, res) => {
  const { player_name, score, level } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO scores (player_name, score, levels) VALUES ($1, $2, $3) RETURNING *",
      [player_name, score, level]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/scores", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM scores ORDER BY score DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
