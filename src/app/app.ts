import express = require('express');
require('dotenv').config()
// Create a new express application instance
const app: express.Application = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes /src/Routes

app.use('/', require('../routes/index'));
app.use('/api/clients', require('../routes/clients'));

// Starting server
app.listen(app.get('port'), function(){
    console.log('Aplication listening on port ', app.get('port'));
})