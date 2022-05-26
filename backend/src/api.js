const client = require('./connection.js')
const redis = require('redis');
const socket = require('socket.io')
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const path = require('path');
const http = require('http');
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");


const app = express();

const io = http.createServer(app);
const server = socket(io)

io.listen(5000, '0.0.0.0', ()=>{
    console.log("El servidor ahora está escuchando en el puerto 5000");
})

client.connect();


// let redisClient = redis.createClient({
//     retry_strategy: (options) => {

//         if (options.error && options.error.code === "ECONNREFUSED") {
//             console.log('Redis: RECONECTANDO - '+options.error.code); 
//         }

//         return Math.min(options.attempt * 100, 3000);
//     },
// });

// redisClient.on('connect', ()=>{
//     console.log("Redis: CONECTADO");
// });

const oneDay = 1000 * 60 * 60 * 24;

app.use(
    session({
      //store: new RedisStore({ client: redisClient }),
      secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: oneDay }
    })
);

// cookie parser middleware
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan('dev'));

app.use(cors({origin:['http://localhost:5000','http://localhost:3000'],methods:['GET','POST','PUT','DELETE'],credentials:true}))

app.use('/public',express.static(path.resolve(__dirname,"public")));

require('./routes/rutas')(app);

//require('./sockets')(server)


module.exports = app;