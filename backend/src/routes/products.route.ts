import { Router } from "express";
import ProductService from "../db/services/product.service";
import logger from "../configs/winston";
import authMiddleware from "../configs/authMiddleware";
import ProductDao from "../db/dao/product.dao";
const router = Router();

router.get("/products", async (req: any, res) => {
  try {
    const user = req.user;
    logger.info("this one is the connect user", user);
    const booksDaos = await ProductService.getProducts();
    res.status(200).json(booksDaos);
  } catch (error) {
    console.error("Error obtener el libro", error);
    res.status(500).json({ message: "error al obtener el libro" });
  }
});

router.get("/testproductsPaginate", async (req: any, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.pageSize) || 8;
    const category = req.query.category || null;
    const sort = req.query.sort || null;

    const products = await ProductDao.testgetPaginatedProducts(
      pageNumber,
      pageSize,
      category,
      sort
    );

    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener los productos paginados", error);
    res
      .status(500)
      .json({ message: "Error al obtener los productos paginados" });
  }
});

router.get("/productsID/:id", async (req, res) => {
  const product_id = parseInt(req.params.id, 10);

  try {
    const product = await ProductService.getProductById(product_id);
    console.log(product);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/createProducts", authMiddleware(["admin"]), async (req, res) => {
  try {
    const products = req.body;

    const productsDao = await ProductService.createProduct(products);

    res.status(200).json(productsDao);
  } catch (error) {
    console.error("Error al crear el libro", error);
    res.status(500).json({ message: "error al crear el libro" });
  }
});

export default router;
