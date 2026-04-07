const express = require('express');
const mysql = require('mysql2');

const app = express();

// Create connection using env variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Connect once when server starts
connection.connect(err => {
  if (err) {
    console.error("❌ DB connection error:", err);
  } else {
    console.log("✅ Connected to MySQL!");
  }
});

app.get('/', (req, res) => {
  connection.query('SELECT 1 AS result', (err, results) => {
    if (err) {
      console.error(err);
      return res.send("❌ Query failed: " + err.message);
    }

    res.send(`🚀 Successfully deployed App and DB connected! Result: ${results[0].result}`);
  });
});

// Cloud Run port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
