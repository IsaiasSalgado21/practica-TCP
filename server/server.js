const net = require('node:net');

//construimos nuestro server
const server = net.createServer();
server.on('connection', (socket)=>{
    socket.on('data', (data)=>{
        console.log('mensaje recibido desde el cliente' + data)
    })
    socket.on('close',()=>{
        console.log('comunicacion finalizada')
    })
    socket.on('error',(err)=>{
        console.log(err.message)
    })
})
server.listen(4444, ()=>{
    console.log('servidor esta escuchando la puesta', server.address().port)
})