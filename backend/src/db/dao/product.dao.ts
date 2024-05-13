import { query } from "express";
import connectToDatabase from "../../configs/configDB";
const db = connectToDatabase("bookrental");

interface Product {
  category: string;
  title: string;
  size: string;
  color: string;
  description: string;
  image_url: string;
  stock: number;
  price: number;
}
export default class ProductDao {
  //se debe testear
  static createProduct(productData: Product): Promise<any> {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO products (title, size, color, description, image_url, stock, price, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          productData.title,
          productData.size,
          productData.color,
          productData.description,
          productData.image_url,
          productData.stock,
          productData.price,
          productData.category,
        ],
        (err: any, res: any) => {
          if (err) {
            console.log("Error al crear producto: ", err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  static getProducts() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM products;", (err: any, res: any) => {
        if (err) {
          console.log("Error al crear libro: ", err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static testgetPaginatedProducts(
    pageNumber = 1,
    pageSize = 8,
    category = null,
    sort = null
  ) {
    return new Promise((resolve, reject) => {
      const offset = (pageNumber - 1) * pageSize;

      let query = "SELECT * FROM products";

      if (category != null) {
        query += " WHERE category = ?";
      }

      if (sort != null) {
        if (["ASC", "DESC"].includes(sort)) {
          query += ` ORDER BY price ${sort}`;
        } else {
          return reject(new Error("El valor de sort debe ser 'ASC' o 'DESC'"));
        }
      }

      query += ` LIMIT ${pageSize} OFFSET ${offset}`;

      console.log(query);
      console.log(
        `Categoría: ${category}, Ordenar por: ${sort}, Tamaño de página: ${pageSize}, Offset: ${offset}`
      );

      db.query(query, category ? [category] : [], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static getProductById(product_id: number) {
    return new Promise((resolve, reject) => {
      // Modifica la consulta SQL para incluir una cláusula WHERE para filtrar por ID
      const query = `SELECT * FROM products WHERE id = ?;`;

      db.query(query, [product_id], (err, res) => {
        if (err) {
          console.error("Error al obtener el producto por ID: ", err);
          reject(err);
        } else {
          if (res.length === 0) {
            // Si no se encontró ningún producto con el ID especificado, devuelve null o un mensaje adecuado
            resolve(null);
          } else {
            // Devuelve el primer resultado (ya que estamos buscando por ID, deberíamos obtener solo un resultado)
            resolve(res[0]);
          }
        }
      });
    });
  }
}
