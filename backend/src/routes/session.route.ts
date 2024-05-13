import { Router } from "express";
import passport from "passport";
import UserDao from "../db/dao/users.dao";

const router = Router();

router.post(
  "/registerPassport",
  passport.authenticate("register", { failureRedirect: "/register" }),
  (req, res) => {
    const { body } = req;

    res.redirect("/login");
  }
);

router.post("/login", passport.authenticate("login"), async (req, res) => {
  res.status(200).json({ message: "Inicio de sesión exitoso" });
});

router.get("/logout", async (req: any, res) => {
  try {
    console.log(req.sessionID);

    const sessionToken = req.sessionID;
    const user = await UserDao.logout(sessionToken);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
