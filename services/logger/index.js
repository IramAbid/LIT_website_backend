import winston from "winston";

//myFormat defines the custom logging format
const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} :: ${label}--> [${level}] :: ${message}`;
});


//config defines the custome levels of logging and their colors
const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    custom: 7
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    custom: 'yellow'
  }
};

// myLogger takes the service name label as an argument and returns a logger service provided by logger function via winston package
const myLogger = (label) => {

  const logger = winston.createLogger({
    levels: config.levels,
    format: winston.format.combine(
      winston.format.colorize({
        true: "all",
      }),
      winston.format.label({ label: label }),
      winston.format.timestamp({ format: "HH:MM:SS" }),
      myFormat
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.Console(),
    ],
    level: 'custom',
  });

  return logger;
}


export default myLogger