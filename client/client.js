// Isaias Salgado Castillo
// Job Moore garay
const net = require('node:net');

const options = {
    port: 4444,
    host: 'localhost'
}

const client = net.createConnection(options)

client.on('connect', ()=>{
    console.log('conexion satisfactoria')
    client.write('Hola servidor, de nuevo y0')
})

client.on('error', (err)=>{
    console.log(err.message)
})