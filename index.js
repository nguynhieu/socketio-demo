const express = require('express')
const app = express()
const port = 3000
const server = require('http').Server(app);

app.use(express.static('public'))

app.get('/', (req, res) => res.send('Hello World!'))

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))