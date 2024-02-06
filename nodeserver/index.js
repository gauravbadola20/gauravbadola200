

//Node server which will handle socket server
const io = require('socket.io')(8000)
const users =  {};

io.on('connection', socket =>{
    socket.on('new-user-joined',namee =>{
        console.log("New User", namee);
        users[socket.id] = namee;
        socket.broadcast.emit('user-joined', namee);


    });
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, namee:users[socket.id]})

    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });

})