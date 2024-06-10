const express = require("express");
const app = express();
const db = require('./db');
require('dotenv').config();

// take data from client which will send fom frontend give it to server (express js)
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 4200;


// import routes
const personRoutes = require('./routers/personRoutes');
const menuItems = require('./routers/menuItemsRoutes');
const customerInfo = require('./routers/customerInfoRoutes');

// use routes
app.use('/person',personRoutes);
app.use('/menu',menuItems);
app.use('/customer',customerInfo);

// from ENV file
app.listen(PORT);