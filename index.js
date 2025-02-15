import express  from "express";
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from "./database/db.js";
import Route from './routes/route.js';

const app = express();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));  
app.use('/',Route);
Connection();

const PORT = 8000;

app.listen(PORT,() => console.log(`Server is running successfully on Port ${PORT}`));

//************************Socket.io**************************************//

import { Server } from "socket.io";

const io = new Server(9000, {
    cors: {
        origin : 'http://localhost:3000',
    }
});

let users = [];

const addUser = (userData, socketId) => {
    !users.some(user => user.sub === userData.sub) && users.push({...userData, socketId });
}

const getUser = (userId) => {
    return users.find(user => user.sub === userId);
}

io.on('connection', (socket) => {
    console.log('users connected');

    socket.on("addUsers", userData => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    })

    socket.on('sendMessage', data => {
        const user = getUser(data.receiverId);
        io.emit('getMessage',data);
        ///io.to(user.socketId).emit('getMessage',data);
    })

})




