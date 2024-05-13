import { describe, it, before } from "mocha";
import connectToDatabase from "../configs/configDB";
var assert = require("assert");

describe("Books test", function () {
  let db: any;
  before(async function () {
    // Establece la conexión a la base de datos antes de cada prueba
    db = connectToDatabase("bookrental");
  });

  it("get of books", async function () {
    // Llama a la función getBooks() y almacena el resultado
    const result = await new Promise<any[]>((resolve, reject) => {
      db.query("SELECT * FROM books;", (err: any, res: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });

    // Verifica si el array no está vacío
    assert(result.length > 0, "El array no debería estar vacío");
  });
});
