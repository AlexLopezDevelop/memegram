const express = require('express');
const memegramRouter = require('./routes/index.js');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const port = 3000
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Memegram API',
      description: 'Memegram API',
      contact: {
        name: 'Alex Lopez',
      },
      servers: [`http://localhost:${port}`],
    },
  },
  apis: ['./routes/*.js'],
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(memegramRouter);
app.use(express.json());

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

module.exports = app;

