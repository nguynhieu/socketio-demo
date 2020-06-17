const express = require('express')
const app = express()
const port = 3000
const server = require('http').Server(app);
const io = require('socket.io')(server)

const usersOnline = [];

io.on("connection", socket => {

  console.log(socket.id, " connected...");
  socket.on("disconnect", () => {
    console.log(socket.id, " disconected...")
  })
  socket.on("user-send-registered", (data) => {
    if (usersOnline.includes(data)) {
      socket.emit("server-send-failed-register")
    } else {
      socket.username = data;
      usersOnline.push(data);
      socket.emit("server-send-success-register", data)
      io.sockets.emit("server-send-list-users", usersOnline)
      // 
    }
  })
  socket.on("user-send-logout", data => {
    const indexUser = usersOnline.indexOf(data);
    usersOnline.splice(indexUser, 1);
    io.sockets.emit("server-send-list-users", usersOnline)
  })

  socket.on("user-send-messenger", data => {
    socket.emit("server-msg-of-sender", data);
    socket.broadcast.emit("server-send-msg", data);
  })
})

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.static('public'))

app.get('/', (req, res) => res.render('index'))

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))