// Isaias Salgado Castillo
// Job Moore Garay
// IDS 8vo TV Sistemas Distribuidos DASC UABCS

const net = require('node:net');
const os = require('os');

const clients = [];

// Función para obtener IP local
const getLocalIP = () => {
    const interfaces = os.networkInterfaces();

    for (let name in interfaces) {
        // Evita interfaces virtuales o de loopback
        if (name.toLowerCase().includes('virtual') || name.toLowerCase().includes('vmware') || name.toLowerCase().includes('loopback')) {
            continue;
        }

        for (let iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }

    return 'localhost'; // En caso de no encontrar una IP válida
};


const server = net.createServer((socket) => {
    clients.push(socket);
    console.log('Nuevo cliente conectado');

    socket.on('data', (data) => {
        try {
            const mensaje = JSON.parse(data.toString().trim());
            console.log(`Mensaje de ${mensaje.nombre}: ${mensaje.texto}`);

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

// Escuchar en puerto 5050 en todas las interfaces
server.listen(5050, '0.0.0.0', () => {
    const ip = getLocalIP();
    console.log(`Servidor escuchando en IP: ${ip} y puerto: 5050`);
    console.log(`Comparte esta IP con tus compañeros para conectarse.`);
});
