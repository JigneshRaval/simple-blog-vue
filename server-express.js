const path = require('path'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const fs = require('fs');
const routes = require('./server/router/index');

// Compress all the assets and server response
const compression = require('compression');

// compress all responses and files
app.use(compression());

// This will help to load other included files in index.html
app.use(bodyParser.json({ limit: '50mb' })); // for parsing application/json
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.resolve(__dirname, 'dist')));

// Caches the static files for a year.
// let oneYear = 1 * 365 * 24 * 60 * 60 * 1000;
// app.use('/', express.static(__dirname + '/public/', { maxAge: oneYear }));

app.use('/api', routes);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Handle 404 Error
app.use(function (req, res) {
    res.status(400).send({ error: '404: File Not Found', message: "Plese Go Back to Home page." });
});

// Handle 500 Error
app.use(function (error, req, res, next) {
    res.status(500).send({ error: '500: Internal Server Error', message: error });
});

app.listen(port, () => { console.log(`App is listening on port http://localhost:${port}`) });


// 1. Car brands page ( cars.js )
/* router.get('/brands', function (req, res) {
    res.send('Audi, BMW, Mercedes')
});
app.use('/cars', require('./cars'))
// This app will respond to /cars/brands

// 2. router.index.js
router.use('/animals', require('./animals'))
router.use('/cars', require('./cars'))

router.get('/', function(req, res) {
  res.send('Home page')
})

router.get('/about', function(req, res) {
  res.send('Learn about us')
})

// 3. finally
app.use(require('./router.index'))
*/
