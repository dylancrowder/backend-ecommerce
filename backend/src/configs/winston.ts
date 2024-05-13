import winston from 'winston';// Configuración de Winston
const logger = winston.createLogger({
    level: 'info', // Establece el nivel mínimo de registro
    format: winston.format.combine(

        winston.format.json() // Formatea los registros como JSON
    ),
    transports: [
        // Transporte para guardar los registros en un archivo
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

// Añadir el transporte de la consola con colorización
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(), // Habilita colores en la consola
            winston.format.simple() // Muestra mensajes simples
        )
    }));
}

export default logger;
