import CartService from "../services/cart.service";

export default class CartController {


    static async addProductToOrder(email: string, product_id: number, quantity: number, size: string , price:number) {
        try {
            // Obtener el pedido existente por correo electrónico y producto
            const existingOrder: any = await CartService.getOrderByEmailandID(email, product_id);

            // Si hay un pedido existente
            if (existingOrder) {
                // Verificar si el tamaño es diferente
                if (existingOrder.size !== size) {
                    // Si los tamaños son diferentes, crear una nueva orden
                    await CartService.addProductToOrder(quantity, email, product_id, size , price);
                    return {
                        success: true,
                        message: `Producto con ID ${product_id} y tamaño ${size} agregado a la nueva orden para el usuario con email ${email}.`
                    };
                } else {

                    // Si los tamaños son iguales, actualizar la cantidad del pedido existente
                    const newQuantity = existingOrder.quantity + quantity;
                    const updatedCart = await CartService.updateOrderByEmailID(newQuantity, email, product_id, size );
                    return updatedCart;

                }
            } else {
                // Si no hay un pedido existente, crear una nueva orden
                await CartService.addProductToOrder(quantity, email, product_id, size , price);
                return {
                    success: true,
                    message: `Producto con ID ${product_id} agregado a la orden para el usuario con email ${email}.`
                };
            }
        } catch (err) {
            console.log("Error manejando la operación de agregar producto a la orden:", err);
            throw err;
        }
    }
}
