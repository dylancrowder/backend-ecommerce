import { Router } from "express";
import UserService from "../db/services/users.service";
import { Request, Response, NextFunction } from "express";
import authMiddleware from "../configs/authMiddleware";

const router = Router();

//end point users
router.get("/users", authMiddleware(["admin"]), async (req, res) => {
  try {
    const users = await UserService.getUsers();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

router.post(
  "/createUser",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_name, email, age, profile_image, password } = req.body;

      await UserService.createUser({
        user_name,
        email,
        age,
        profile_image,
        password,
      });

      res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/getUserEmail", authMiddleware(["admin"]), async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserService.getUserByEmail(email);

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener usuario por correo electrónico" });
  }
});

router.delete("/deleteUser", authMiddleware(["admin"]), async (req, res) => {
  try {
    const email = req.query.email as string;

    console.log("Este es el email:", email);

    await UserService.deleteUser(email);

    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
});

export default router;
