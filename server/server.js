// Isaias Salgado Castillo
// Job Moore Garay
// IDS 8vo TV Sistemas Distribuidos DASC UABCS

const net = require('node:net');

const clients = [];

const server = net.createServer();

server.on('connection', (socket) => {
    clients.push(socket);
    console.log('Nuevo cliente conectado');

    socket.on('data', (data) => {
        try {
            const mensaje = JSON.parse(data.toString().trim());
            console.log(`Mensaje de ${mensaje.nombre}: ${mensaje.texto}`);

            // Enviar mensaje a los demás clientes
            clients.forEach((client) => {
                if (client !== socket) {
                    client.write(`${mensaje.nombre} dice: ${mensaje.texto}\n`);
                }
            });
        } catch (err) {
            console.log('Error al interpretar el mensaje:', err.message);
        }
    });

    socket.on('close', () => {
        console.log('Comunicación finalizada');
        const index = clients.indexOf(socket);
        if (index !== -1) clients.splice(index, 1);
    });

    socket.on('error', (err) => {
        console.log('Error:', err.message);
    });
});

server.listen(4444,'0.0.0.0', () => {
    console.log('Servidor está escuchando en el puerto', server.address().port);
});
