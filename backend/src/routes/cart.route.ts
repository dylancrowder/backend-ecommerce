import { Router } from "express";
import CartController from "../db/controller/cart.controller";
import CartService from "../db/services/cart.service";
import CartDao from "../db/dao/cart.dao";
const router = Router();

router.post("/addNewOrder", async (req: any, res) => {
  try {
    const email = req.user.email;
    const { product_id, quantity, size, price } = req.body;
    console.log(product_id, quantity, size);

    const order = await CartController.addProductToOrder(
      email,
      product_id,
      quantity,
      size,
      price
    );
    console.log("esta es la order ", order);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

//manejar errores y testear
router.get("/cart", async (req: any, res: any) => {
  try {
    const email = req.user.email;
    const cart = await CartService.getOrderByEmail(email);
    console.log(cart);

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/getCart", async (req: any, res: any) => {
  try {
    const email = req.user.email;
    const cart = await CartDao.getOrdersByProductId(email);

    console.log(cart);

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/deletePorductID", async (req: any, res) => {
  const { product_id } = req.body;
  const user: any = req.user;
  console.log(user);

  const email = user.email;
  const cartDeleted = await CartService.deleteOrderByEmailAndID(
    email,
    product_id
  );

  res.status(200).json(cartDeleted);
});

export default router;
