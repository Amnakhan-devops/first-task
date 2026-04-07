const express = require('express');
const mysql = require('mysql2');

const app = express();

// Create connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Try connecting (but don't crash app)
connection.connect(err => {
  if (err) {
    console.error("❌ DB connection error:", err.message);
  } else {
    console.log("✅ DB connected");
  }
});

app.get('/', (req, res) => {
  connection.query('SELECT 1 AS result', (err, results) => {
    if (err) {
      return res.send("❌ Query error: " + err.message);
    }
    res.send("✅ Connected! Result: " + results[0].result);
  });
});

// MUST listen on PORT
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
