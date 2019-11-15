const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./auth/router');
const advertisementRouter = require('./advertisement/router');
const userRouter = require('./user/router');

const app = express();
const port = process.env.PORT || 4050;
const corsMiddleware = cors();
const parseMiddleware = bodyParser.json();

app.use(corsMiddleware);
app.use(parseMiddleware);
app.use(authRouter);
app.use(advertisementRouter);
app.use(userRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
