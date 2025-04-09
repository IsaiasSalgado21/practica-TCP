// Isaias Salgado Castillo
// Job Moore Garay
// IDS 8vo TV Sistemas Distribuidos DASC UABCS

const net = require('node:net');
const readline = require('readline');


const client = net.createConnection({ port: 5050, host: '192.168.1.210' });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let username = '';

client.on('connect', () => {
    rl.question('Ingresa tu nombre: ', (name) => {
        username = name.trim();
        console.log(`¡Bienvenido, ${username}! Ya puedes enviar mensajes.`);
        mostrarGuia();

        rl.setPrompt(`${username}: `);
        rl.prompt();

        rl.on('line', (line) => {
            const texto = line.trim();

            // Si el client escribe /salir, cerrar conexión
            if (texto.toLowerCase() === '/salir') {
                client.end();
                rl.close();
                console.log('Desconectado del servidor.');
                return;
            }

            const mensaje = JSON.stringify({ nombre: username, texto });
            client.write(mensaje);
            rl.prompt();
        });
    });
});

client.on('data', (data) => {
    console.log('\n' + data.toString().trim());
    mostrarGuia();
    rl.prompt();
});

client.on('error', (err) => {
    console.log('Error:', err.message);
});

client.on('end', () => {
    console.log('\nConexión cerrada por el servidor.');
    rl.close();
});

function mostrarGuia() {
    console.log('Escribe /salir para desconectarte.');
}
