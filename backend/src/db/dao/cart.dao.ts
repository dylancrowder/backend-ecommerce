import connectToDatabase from "../../configs/configDB";
const db = connectToDatabase("bookrental");

export default class CartDao {
  static getOrderByEmailandID(email: string, product_id: number) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM orders WHERE email = ? AND product_id = ?",
        [email, product_id],
        (err, res) => {
          if (err) {
            console.log("Error al obtener orden por correo electrónico: ", err);
            reject(err);
          } else {
            resolve(res[0]);
          }
        }
      );
    });
  }

  static deleteOrderByEmailAndID(email: string, product_id: number) {
    return new Promise((resolve, reject) => {
      // Define la consulta DELETE
      const query = "DELETE FROM orders WHERE email = ? AND product_id = ?";

      // Ejecuta la consulta con los parámetros email y product_id
      db.query(query, [email, product_id], (err, res) => {
        if (err) {
          console.log(
            "Error al eliminar la orden por correo electrónico: ",
            err
          );
          reject(err);
        } else {
          // Resuelve la promesa con los resultados de la consulta
          resolve(res);
        }
      });
    });
  }

  static getOrderByEmail(email: string) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM orders WHERE email = ?", [email], (err, res) => {
        if (err) {
          console.log("Error al obtener orden por correo electrónico: ", err);
          reject(err);
        } else {
          resolve(res); // Resuelve con todos los resultados
        }
      });
    });
  }

  static updateOrderByEmailID(
    quantity: number,
    email: string,
    product_id: number,
    size: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE orders SET quantity = ? WHERE email = ? AND product_id = ? AND size = ? ",
        [quantity, email, product_id, size],
        (err: any, res: any) => {
          if (err) {
            console.log(
              "Error al actualizar orden por correo electrónico: ",
              err
            );
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  static getOrdersByProductId(email: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const query = `
            SELECT
                o.email,
                p.id AS product_id,
                p.title,
                p.color,
                p.price,
                p.description,
                p.image_url,
                p.stock,
                p.category,
                o.size AS order_size,
                SUM(o.quantity) AS total_quantity,
                SUM(o.price * o.quantity) AS total_value
            FROM
                orders o
            JOIN
                products p ON o.product_id = p.id
            WHERE
                o.email = ?
            GROUP BY
                o.email,
                p.id,
                p.title,
                p.color,
                p.description,
                p.image_url,
                p.stock,
                p.category,
                o.size;
            `;

      db.query(query, [email], (err, results) => {
        if (err) {
          console.error("Error al consultar pedidos por product_id:", err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static addProductToOrder(
    quantity: number,
    email: string,
    product_id: number,
    size: string,
    price: number
  ) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO orders (email, product_id, quantity , size , price) VALUES (?, ?, ? , ? , ?)",
        [email, product_id, quantity, size, price],
        function (err, res) {
          if (err) {
            console.log("Error adding product to order:", err);
            reject({ name: err });
          } else {
            resolve(res);
          }
        }
      );
    });
  }
}
