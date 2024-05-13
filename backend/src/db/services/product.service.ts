import ProductDao from "../dao/product.dao";

export default class ProductService {
  static createProduct(productData: any) {
    return ProductDao.createProduct(productData);
  }

  static getProducts() {
    return ProductDao.getProducts();
  }

  static getProductById(product_id: number) {
    return ProductDao.getProductById(product_id);
  }
}
