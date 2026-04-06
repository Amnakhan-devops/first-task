const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('My first deployment of Node.js App on Cloud Run: Working Perfectly! 🚀');
});

// Cloud Run automatically 'PORT' environment variable assign karta hai
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
