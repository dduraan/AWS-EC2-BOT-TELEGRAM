const TelegramBot = require('node-telegram-bot-api');
const os = require('os');
const diskusage = require('diskusage');
const osUtils = require('os-utils');
const { networkInterfaces } = require('os');
const dns = require('dns');
const { exec } = require('child_process');

// Token de tu bot
const token = '';

// ID del chat de administrador, reemplaza con tu ID de chat real
const adminChatId = '6898905627';
// Crea un nuevo bot
const bot = new TelegramBot(token, { polling: true });

console.log('Bot en ejecución...');

// Usamos un objeto para mantener un registro de qué usuario ya ha sido saludado
let greetedUsers = {};

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Verificamos si el usuario ya fue saludado
    if (!greetedUsers[userId]) {
        // Guarda el userId en el objeto para no saludar nuevamente
        greetedUsers[userId] = true;

        // Envía un mensaje de bienvenida
        bot.sendMessage(chatId, `¡Hola ${msg.from.first_name}! Bienvenido a mi bot. Te ayudaré a monitorear y gestionar tus sistemas. ¿Cómo puedo ayudarte hoy?`);
    }
});
// Comando /systeminfo mejorado
bot.onText(/\/systeminfo/, (msg) => {
  const chatId = msg.chat.id;

  // Obtener información de la CPU
  osUtils.cpuUsage((cpuPercent) => {
    // CPU usage devuelve el porcentaje de uso
    const cpuUsage = (cpuPercent * 100).toFixed(2);

    // Obtener información del almacenamiento
    diskusage.check(os.platform() === 'win32' ? 'c:' : '/', (err, info) => {
      if (err) {
        console.error("Error obteniendo la información de disco:", err);
        bot.sendMessage(chatId, "Error al obtener información de disco.");
        return;
      }

const totalDisk = info.total / (1024 * 1024 * 1024); // Convertir a GB
      const freeDisk = info.free / (1024 * 1024 * 1024); // Convertir a GB
      const usedDisk = totalDisk - freeDisk; // Almacenamiento usado en GB

      // Información de la RAM
      const totalMemory = os.totalmem() / (1024 * 1024 * 1024); // Convertir a GB
      const freeMemory = os.freemem() / (1024 * 1024 * 1024); // Convertir a GB
      const usedMemory = totalMemory - freeMemory; // RAM usada en GB

 // Crear mensaje de respuesta
      const responseText = `Información del Sistema:\n` +
                           `CPU Utilizada: ${cpuUsage}%\n` +
                           `Memoria Total: ${totalMemory.toFixed(2)} GB\n` +
                           `Memoria Utilizada: ${usedMemory.toFixed(2)} GB\n` +
                           `Almacenamiento Total: ${totalDisk.toFixed(2)} GB\n` +
                           `Almacenamiento Utilizado: ${usedDisk.toFixed(2)} GB`;

      // Enviar mensaje
      bot.sendMessage(chatId, responseText);
    });
  });
});

// Función para obtener la IP privada
const getPrivateIP = () => {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Filtrar direcciones IPv4 e internas que no sean localhost
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'No se pudo obtener la IP privada';
};

// Comando /server para mostrar hostname e IP privada
bot.onText(/\/server/, (msg) => {
  const chatId = msg.chat.id;
  const hostname = os.hostname();
  const ipPrivate = getPrivateIP();

  const responseText = `Hostname: ${hostname}\nIP Privada: ${ipPrivate}`;
  bot.sendMessage(chatId, responseText);
});

// Comando /version para mostrar la versión del SO
bot.onText(/\/version/, (msg) => {
  const chatId = msg.chat.id;
  const type = os.type(); // "Linux" en sistemas Linux
  const release = os.release(); // La versión del kernel en Linux

  const responseText = `Sistema Operativo: ${type}\nVersión: ${release}`;
  bot.sendMessage(chatId, responseText);
});

// Comando /version para mostrar la versión del SO
bot.onText(/\/version/, (msg) => {
  const chatId = msg.chat.id;
  const type = os.type(); // "Linux" en sistemas Linux
  const release = os.release(); // La versión del kernel en Linux

  const responseText = `Sistema Operativo: ${type}\nVersión: ${release}`;
  bot.sendMessage(chatId, responseText);
});

// Comando /uptime para mostrar el uptime del servidor
bot.onText(/\/uptime/, (msg) => {
  const chatId = msg.chat.id;
  const uptime = os.uptime(); // Uptime en segundos
  const uptimeHours = (uptime / 3600).toFixed(2);
  const responseText = `El sistema ha estado activo por: ${uptimeHours} horas`;
  bot.sendMessage(chatId, responseText);
});

// Comando /getlogs para mostrar los últimos 100 registros del sistema
bot.onText(/\/getlogs/, (msg) => {
  const chatId = msg.chat.id;
  exec('tail -n 5 /var/log/syslog', (err, stdout, stderr) => {
    if (err) {
      bot.sendMessage(chatId, 'Error al obtener los logs');
      return;
    }
    bot.sendMessage(chatId, `Últimos logs del sistema:\n${stdout}`);
  });
});

// Lista de comandos disponibles y sus descripciones
const commands = [
    { command: '/start', description: 'Inicia interacción con el bot y te saluda.' },
    { command: '/comandos', description: 'Muestra la lista de comandos disponibles.' },
    { command: '/uptime', description: 'Muestra cuánto tiempo ha estado funcionando el servidor.' },
    { command: '/getlogs', description: 'Obtiene los últimos logs del sistema.' },
    { command: '/server', description: 'Muestra la IP y el nombre del host del servidor.' },
    { command: '/systeminfo', description: 'Muestra información sobre el sistema como CPU y memoria.' }
];

// Manejador para el comando /comandos
bot.onText(/\/comandos/, (msg) => {
    const chatId = msg.chat.id;
    let responseText = "Aquí tienes una lista de comandos que puedes usar:\n\n";
    commands.forEach(cmd => {
        responseText += `${cmd.command}: ${cmd.description}\n`;
    });
    bot.sendMessage(chatId, responseText);
});

function checkCPU() {
    osUtils.cpuUsage(function(v) {
        if (v > 0.8) {  // 80% de uso de CPU
            bot.sendMessage(adminChatId, `Alerta: Uso alto de CPU al ${Math.round(v * 100)}%`);
        }
    });
}

function checkCPU() {
    osUtils.cpuUsage(function(v) {
        if (v > 0.8) {  // 80% de uso de CPU
            bot.sendMessage(adminChatId, `Alerta: Uso alto de CPU al ${Math.round(v * 100)}%`);
        }
    });
}


function checkDisk() {
    diskusage.check('/', function(err, info) {
        if (err) {
            console.log("Error al verificar el uso del disco:", err);
            return;
        }
        const usedDiskPercent = (info.total - info.available) / info.total;
        if (usedDiskPercent > 0.8) {  // Más del 80% en uso
            bot.sendMessage(adminChatId, `Alerta: Uso alto de almacenamiento, ${Math.round(usedDiskPercent * 100)}% usado`);
        }
    });
}

// Verificar el uso de la CPU cada 24 horas
setInterval(checkCPU, 86400000); // 86400000 milisegundos == 24 horas

// Verificar el uso del disco cada semana

setInterval(checkDisk, 604800000); // 604800000 milisegundos == 1 semana
