// Isaias Salgado Castillo
// Job Moore Garay
// IDS 8vo TV Sistemas Distribuidos DASC UABCS

const net = require('node:net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Paso 1: Pedir IP
rl.question('Ingresa la IP del servidor (ej. 192.168.1.100): ', (ip) => {
    const client = net.createConnection({ port: 5050, host: ip.trim() });

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
        rl.close();
    });

    client.on('end', () => {
        console.log('\nConexión cerrada por el servidor.');
        rl.close();
    });

    function mostrarGuia() {
        console.log('Escribe /salir para desconectarte.');
    }
});
