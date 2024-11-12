const express = require ('express');
const session = require ('express-session');
const app = express();
const cors = require("cors");
const PORT = 3002;
const dbFunctions = require("../dbFunctions/functions.js")
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const Redis = require('ioredis')
const RedisStore = require("connect-redis").default;
const redis = require('redis');
const redisClient = new Redis();
const WebSocket = require('ws');
const http = require('http')
const server = http.createServer(app);
const {v4: uuidv4} = require('uuid')
const { Server } = require('socket.io')
const io = new Server()

const clnt = redis.createClient();

clnt.on('error', err => console.log('Redis Client Error', err));


async function getGoing(){
await clnt.connect();
let m = await clnt.keys('*')
let f = await clnt.flushAll()
console.log(`The Active Users Are: ${m}`)
console.log('after flush', f)
}

getGoing()


app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

const ios = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

let users = new Map();

ios.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (username) => {
        users.set(username, socket.id);
        console.log(`Stored ${username} with ID ${socket.id}`);
        console.log("Current Users Map:", users);
    });
  
   // Handle message sending
  socket.on("send_message", (data) => {
    console.log("Sending message:", data);
    // Retrieve target user's socket ID from map
    const targetSocketId = users.get(data.target);
    console.log(targetSocketId)
    socket.to(targetSocketId).emit("receive_message", data);
});

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
  });

app.use(session({
    name: "sud",
    store: new RedisStore({ client: redisClient }),
    secret: 'session-information', // Replace with a strong secret
    resave: false, // Save session even if not modified
    saveUninitialized: false, // Save uninitialized sessions
    cookie: {
        httpOnly: true,
        maxAge: 1000* 60 * 60 * 24,
        secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax"
    }
  }));

app.use(express.json());

app.get("/", (req, res) =>{
    res.send("Hello World");
});

app.get("/private", (req, res) =>{
    if (!req.cookies.token) return res.status(401).send();
  res.status(200).json({ secret: "Ginger ale is a specific Root Beer" });
});

app.post(`/call/routereg`, async (req, res) =>{
    let user = req.body.username;
    let address = req.body.email;
    let passw = req.body.password
    let message = {success: "True"}
    if (user!='' && address != '' && passw!= ''){
        let returnValue = await dbFunctions.register(user, address, passw);
        if(returnValue!=1){
        console.log("Error with SQL REGISTRATION")
        res.status(400).json({message:"Username Already Exists"})
        }
        else{
            res.json({message: "sucessful registration"})
        }
    }
    else{
        res.status(500).json({message: "Something went Wrong"})
    }
});

app.post(`/api/verify`, async (req, res) =>{
        let user = req.body.username;
        let passW = req.body.password;
        let returned = await dbFunctions.login(user,passW)
           if(returned){
           let answer = await clnt.get(user)
           console.log(answer)
           console.log(await clnt.keys('*'))
            if(!answer){
                res.cookie('userLoggedIn', `${req.session.id}`, {
                    httpOnly: true,  
                    secure: true,  
                    maxAge: 1000 * 60 * 60 * 24, 
                    sameSite: 'none',
                });

            res.json({userExists: true, name: `${user}`, ID: `${req.sessionID}`})
            }
            else{
                res.json({userExists: true, name: `${user}`, message: `Already Exists`})
            }}
            else{
                res.json({userExists: false})
           }
    });

    app.post('/api/logout', async (req, res) => {
        res.clearCookie('userLoggedIn', { path: '/', domain: 'localhost', secure: false, sameSite: 'Lax' });
        req.session.destroy((err) => {
            if (err) {
              return res.status(500).send('Error destroying session')};  
        })
        console.log("REQ BODY IS", req.body)
        users.delete(req.body.myName);
        console.log("After Log Out, Users Are:", users)
        res.json({"userCleared": true})

});

app.post('/api/retrievemessage',  async (req, res) => {
    let receiver = req.body.rec
    let user = req.body.user
    let answer = await dbFunctions.retrieveMessage(user, receiver)
    console.log("First message is ", answer.messages[0][0])
    res.json({Message: answer})
})

app.post('/api/friendslist', async(req, res) =>{
    let user = req.body.user
    result = await dbFunctions.retrieveFriendsList(user);
    console.log("Friends List:", result)
    let status = []
    result.map((element, index) =>{
        if (users.has(element)){
            status[index] = "Online"
        }
        else{
            status[index] = "Offline"
        }
    })
    res.send(JSON.stringify({friends: result, stat: status}))
})

app.post('/api/sendmessages',  async (req, res) => {

    let user = req.body.user
    let target = req.body.target
    let message = req.body.message
    let number = req.body.number

let querryResult = await dbFunctions.storeMessage(user, target, message, number)

if(querryResult){
    res.json(JSON.stringify({Result: "successful"}))
}
else{
    res.json(JSON.stringify({Result: "unsuccessful"}))
}

})



app.post('/api/messages',  async (req, res) => {
    console.log("we are listening in the messages")
    console.log(req.session.id)
    let sender = req.body.sender
    console.log(`sender is from api: ${sender}`)
    let reciever = req.body.tar
    let message = req.body.mess
    console.log(sender, reciever, message)
    let answer = dbFunctions.storeMessage(sender, reciever, message)
    console.log(`API RESPONSE ON SERVER: ${answer}`)
    res.json({Message: "RECIEVED"})
})

app.post('/api/findfriends',  async (req, res) => {
    let sender = req.body.currentUser
    console.log(`sender is from api: ${sender}`)
    let friend = req.body.find
    console.log(sender, friend)
    let answer = dbFunctions.findUser(sender, friend)
    console.log(`API RESPONSE ON SERVER: ${ await answer}`)
    if(await answer == 100){
        console.log("Friend Not Found")
        res.json(JSON.stringify({result: 100}))
    }
    else if(await answer == 400){
        console.log("Request Previously Sent")
        res.json(JSON.stringify({result: 400}))
    }
    else if (await answer == 200){
        console.log("Successful")
        res.json(JSON.stringify({result: 200}))
    }
})
    

server.listen(PORT, () =>{
    console.log(`API LISTENING HERE ${PORT}`);
})