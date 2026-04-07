const express = require('express');
const mysql = require('mysql2');

const app = express();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // Cloud SQL proxy usually uses 3306 by default
  port: 3306 
});

connection.connect(err => {
  if (err) {
    console.error("❌ DB connection error:", err.message);
  } else {
    console.log("✅ Successfully connected to MY SQL Database!");
  }
});

app.get('/', (req, res) => {
  connection.query('SELECT 1 AS result', (err, results) => {
    if (err) return res.status(500).send("DB Error: " + err.message);
    res.send(`🚀 Connected to Database Result: ${results[0].result}`);
  });
});

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`App listening on port ${port}`);
});
