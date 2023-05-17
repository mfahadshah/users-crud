const express = require('express')
const cors = require('cors')
const connectDB = require('./db/mongo_db');
const { errorHandler } = require('./middlewares/errorMiddleware')

const PORT = process.env.PORT || 5000;

const app = express();
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

app.use(express.json({limit:'50mb'}))
app.use(cors({
  origin: '*',
  credentials: true
}))

//Connect Database
connectDB();

//uncomment this to seed users => seedUsersDB(numOfAccounts)
// require('./seeders/users').seedUsersDB(10000)

//Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

//error handler middleware
app.use(errorHandler);