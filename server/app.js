const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');
const connectDB = require('./utils/connectDB');
const decodeAccessToken = require('./middlewares/decodeAccessToken');
const fileUpload = require('express-fileupload');
const { socketInit } = require('./utils/socketInit');

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(decodeAccessToken());

socketInit(server);

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use('/public', express.static('public'));

app.use('/api', routes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

  connectDB();
});
