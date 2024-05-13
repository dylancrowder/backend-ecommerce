import { Router } from "express";
import CartDao from "../db/dao/cart.dao";
import UserController from "../db/controller/cart.controller";


const router = Router();

router.post("/orderByEmail", async (req, res) => {
  try {
    const { email, product_id } = req.body;
    console.log(email);

    const response = await CartDao.getOrderByEmailandID(email, product_id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

router.post("/updateByEmail", async (req, res) => {
  try {
    const { quantity, email, product_id, size } = req.body;
    console.log(email);

    const response = await CartDao.updateOrderByEmailID(
      quantity,
      email,
      product_id,
      size
    );
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getOrderJoin", async (req: any, res) => {
  try {
    const email: any = req.user.email;
    console.log(email);

    const response = await CartDao.getOrdersByProductId(email);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

router.post("/addToCard", async (req, res) => {
  try {
    const { quantity, email, product_id, size, price } = req.body;

    const response = await UserController.addProductToOrder(
      email,
      product_id,
      quantity,
      size,
      price
    );
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

export default router;
