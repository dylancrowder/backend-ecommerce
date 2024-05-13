import supertest from "supertest";
import app from "../app";
import assert from "assert";

const request = supertest(app);

describe("POST /addToCard", function () {
  it("should add a product to the order", async function () {
    // Datos de prueba
    const quantity = 2;
    const email = "123@123.com";
    const product_id = 1;
    const size = "M";

    // Realiza una solicitud POST a la ruta /addToCard
    const response = await request
      .post("/addToCard")
      .send({ quantity, email, product_id, size });

    // Verifica la respuesta utilizando assert
    assert.strictEqual(
      response.status,
      200,
      "El código de estado debería ser 200"
    );

    // Verifica que el cuerpo de la respuesta sea un objeto
    assert.ok(
      typeof response.body === "object",
      "El cuerpo de la respuesta debería ser un objeto"
    );

    // Verifica que la respuesta contenga los datos esperados
    assert.strictEqual(
      response.body.quantity,
      quantity,
      "La cantidad debería ser igual a la proporcionada"
    );
    assert.strictEqual(
      response.body.email,
      email,
      "El correo electrónico debería ser igual al proporcionado"
    );
    assert.strictEqual(
      response.body.product_id,
      product_id,
      "El ID del libro debería ser igual al proporcionado"
    );
    assert.strictEqual(
      response.body.size,
      size,
      "El tamaño debería ser igual al proporcionado"
    );
  });

  // Puedes agregar más pruebas aquí para probar otros casos, como manejar errores, casos límite, etc.
});
