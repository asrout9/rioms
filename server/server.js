require('dotenv').config();
const express = require('express');
const usersRouter = require('./routes/usersRoutes');
const connectDB = require('./db');

const app = express();
connectDB();
app.use(express.json());
app.use('/users', usersRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port no- ${port}`);
});
