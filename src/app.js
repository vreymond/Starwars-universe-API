let express = require('express');
let bodyParser = require('body-parser');
let program = require('commander');
let adminRoutes = require('./routes/admin-routes');
let userRoutes = require('./routes/user-routes');
let logger = require('./lib/logger').logger;
let setLogLevel = require('./lib/logger').setLogLevel;

let app = express();
let logsDB = {
    "name": "guestSWU",
    "password": "50xReGJGiY5kTBD3"
}
console.log(logsDB)

//Commander package for optional commands at start
program
    .version('1.0.0')
    .option('-a, --admin <adminDB>', 'Admin access of the database')
    .option('-p, --password <passwordDB>', 'Password of the admin')
    .option('-v, --verbosity <logLevel', 'Set log level', setLogLevel)
    .parse(process.argv);

/*
---------------------------------------
      Checking optional commands
---------------------------------------
*/
if (program.admin && program.password) {
    console.log('Admin mode')
    logsDB.name = program.admin;
    logsDB.password = program.password

    console.log(logsDB)
   

    app.use(adminRoutes);
    app.use(userRoutes);
}   
else if (!program.admin && !program.password) {
    console.log('User mode')
    app.use(userRoutes);
}
else {
    console.log('ici');
}


/*
---------------------------------------
        App middlewares usage
---------------------------------------
*/

app.use((req, res, next) => {
    logger.debug(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    next();
})

app.use(adminRoutes);
app.use(userRoutes);
app.use(express.static('public'));

//Handler for 404 error 
app.use((req, res, next) => {
    res.status(404).send('Error 404 - Not Found')
});

//Handler for 500 error
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Error 500 - Internal Server Error')
    //res.sendFile(path.join(__dirname, '../public/500.html'))
})

logger.info(`***** Starting public Starwars Universe API *****`);

const PORT =  process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server listening on ${PORT}`));







