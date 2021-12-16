const express = require('express');
const mustache = require('mustache-express');
const sqlite3 = require('sqlite3');

const http = require('http');
const app = express();
let db = new sqlite3.Database("./file.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("db connected");
    }
});

app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + "/views");
app.set('view engine', 'mustache');
app.engine('mustache', mustache());


// db.run('CREATE TABLE messageHistory (message TEXT);');
// db.run("INSERT INTO messageHistory VALUES ('Nothin much!');")




const server = http.createServer(app);
const {
    Server
} = require("socket.io");
const io = require('socket.io')(server);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views');
});

// LIGHTSWITCH
// let num = 0;
// app.get("/check", (req,res) => {
//   res.end(num + '');
// });

// app.get("/change", (req,res) => {
//  if (num == 1) {
//    num = 0;
//  } else {
//    num = 1;
//  }
//  res.end();
// });
// LIGHTSWITCH

app.get("/", (req, res) => {
    res.render('home');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    db.all("SELECT message FROM messageHistory", (err, answer) => {
    for (let i = 0; i < answer.length; i++) {
        console.log(answer[i].message);
        io.emit('chat message', answer[i].message);

    }
});
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


let msgList = [];






io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        msgList.push(msg + ' ');
        console.log(msgList);

        //puts msg into database
        db.run("INSERT INTO messageHistory VALUES (?);", msg);
        //logs that msg as an item in the database "array"
        db.all("SELECT message FROM messageHistory", (err, answer) => {
            if (err)
                console.log(err);

            console.log(answer[0].message);
        });

        io.emit('chat message', msg);
    });
});

server.listen(8080, () => {
    console.log("we have liftoff");
});