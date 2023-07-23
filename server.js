const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', () => {
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection established'));

const app = require('./app');

const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  console.log(`App running at ${port}....`)
);

process.on('unhandledRejection', () => {
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated!');
  });
});
