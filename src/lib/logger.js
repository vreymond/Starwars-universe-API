let winston = require('winston');

const config = {
    levels: {
        error: 0,
        warn: 1,
        success: 2,
        info: 3,
        debug: 4,
        verbose: 5,
        silly: 6
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        success: 'green',
        info: 'cyan',
        debug: 'blue',
        verbose: 'grey',
        silly: 'magenta'
    }
  };

winston.addColors(config.colors);

function createFileTransport(path="./sw-universe.log"){

    let files = new winston.transports.File({ filename: path,
        format: winston.format.combine(
        winston.format.simple()
        ) });
    return files;
}

let consoleT = new winston.transports.Console(
  { 
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
});
winston.add(consoleT);

//let fileDefaultTransport:winston.transports.FileTransportInstance = createFileTransport();
//winston.add(fileDefaultTransport);

let logLevel = 'info';

function isLogLvl(value){
    return config.levels.hasOwnProperty(value)
}
function setLogLevel(value) {
    
    if(!isLogLvl(value))
        throw `Unrecognized logLvel "${value}"`;
    logLevel = value;
    winston.level = logLevel;
}

function setLogFile(logFilePath) {
    //winston.remove(fileDefaultTransport);
    let fileCustomTransport = createFileTransport(logFilePath);
    winston.add(fileCustomTransport);
    //winston.level = logLevel;
}

exports.logger = winston;
exports.setLogLevel = setLogLevel;