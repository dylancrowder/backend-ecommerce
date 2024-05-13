import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    // Log detallado del error en el servidor para depuración
    console.error("Error en la aplicación:", {
        message: err.message,
        stack: err.stack, // Pila de llamadas para ayudar a rastrear el error
        path: req.path, // Ruta donde ocurrió el error
        method: req.method, // Método HTTP usado
        body: req.body // Cuerpo de la solicitud si está presente
    });

    // Clasificación de errores (puedes personalizar esto según tus necesidades)
    let statusCode = 500;
    let errorMessage = "Error interno del servidor";

    if (err.name === 'ValidationError') {
        statusCode = 400; // Error de validación
        errorMessage = "Error de validación: " + err.message;
    } else if (err.name === 'DatabaseError') {
        statusCode = 503; // Error de base de datos
        errorMessage = "Error en la base de datos: " + err.message;
    } else if (err.name === 'NetworkError') {
        statusCode = 502; // Error de red
        errorMessage = "Error de red: " + err.message;
    }

    // Responder al cliente con un código de estado adecuado y un mensaje de error claro
    res.status(statusCode).json({
        error: {
            message: errorMessage,
            code: err.code || null, // Código de error, si está presente
        }
    });
}
