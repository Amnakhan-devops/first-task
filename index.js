const express = require('express');
const mysql = require('mysql2');

const app = express();

<<<<<<< HEAD
// Create connection using env variables
=======
// Create connection
>>>>>>> 653b209bc7998fcb0ca3a89126316b8c14e5353b
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

<<<<<<< HEAD
// Connect once when server starts
connection.connect(err => {
  if (err) {
    console.error("❌ DB connection error:", err);
  } else {
    console.log("✅ Connected to MySQL!");
=======
// Try connecting (but don't crash app)
connection.connect(err => {
  if (err) {
    console.error("❌ DB connection error:", err.message);
  } else {
    console.log("✅ DB connected");
>>>>>>> 653b209bc7998fcb0ca3a89126316b8c14e5353b
  }
});

app.get('/', (req, res) => {
  connection.query('SELECT 1 AS result', (err, results) => {
    if (err) {
<<<<<<< HEAD
      console.error(err);
      return res.send("❌ Query failed: " + err.message);
    }

    res.send(`🚀 Successfully deployed App and DB connected! Result: ${results[0].result}`);
  });
});

// Cloud Run port
=======
      return res.send("❌ Query error: " + err.message);
    }
    res.send("✅ Connected! Result: " + results[0].result);
  });
});

// MUST listen on PORT
>>>>>>> 653b209bc7998fcb0ca3a89126316b8c14e5353b
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
