const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// // tell the app to look for static files in these directories
app.use(express.static('./client/'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const writeJsonMiddleware = require('./server/middleware/writeJson');
app.use('/api/writeJson', writeJsonMiddleware);

const apiRoutes = require('./server/api');
app.use('/api', apiRoutes);

const port = process.env.PORT || 3000;

// start the server
app.listen(port, () => {
  console.log(`Server is running`);
});
