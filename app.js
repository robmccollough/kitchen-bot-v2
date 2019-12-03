require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const fs = require('fs');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const bearerToken = require('express-bearer-token');
const bp = require('body-parser');

//shameless season 2 
app.use(bp.json())
app.use(bp.urlencoded({extended: false}))
app.use(cookieparser())
app.use(cors())
app.use(bearerToken())

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

//shameless
const files = fs.readdirSync(path.join(__dirname, 'routes'));
files.forEach(file => {
  const router = require(path.join(__dirname, './routes', file));

  if (!router.router) {
    console.log(`'${file}' did not export a 'router'. Skipped`);
    return;
  }
  if (!router.prefix) {
    console.log(`'${file}' did not export a 'prefix' path. Defaulting to '/'`)
  }

  app.use(router.prefix || '/', router.router);
  console.log(`registered '${file}' to route '${router.prefix || '/'}'`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.listen(port, () => {
    if (process.argv[2] === '--dev') {
        require('./dev').dev(port, process.env.LT_SUBDOMAIN);
    }
    console.log(`App listening on port ${port}!`)
})







