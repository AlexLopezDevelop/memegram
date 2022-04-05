const express = require('express');
const memegramRouter = require('./routes/index.js');
const app = express();

const port = 3000

app.use(memegramRouter);
app.use(express.json());

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

module.epxorts = app;

