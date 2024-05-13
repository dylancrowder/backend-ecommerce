//sacar any y poner [string]
function authMiddleware(roles:any ) {
    return (req: any, res: any, next: any) => {
        const token = req.user.role;

        if (!token) {
            return res.status(401).json({ message: "Autenticación requerida" });
        }

        try {

            if (!roles.includes(token)) {
                return res.status(403).json({ message: "No tienes permisos para acceder a este recurso" });
            }
            console.log("Está autorizado");
            next();
        } catch (error) {
            console.error("Error de autenticación:", error);
            return next(error);
        }
    };
}

export default authMiddleware;
