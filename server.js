require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Shopify Data Manager server is running!<br>Studio Economik API Key: ' + process.env.STUDIO_API_KEY);
  });


app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
