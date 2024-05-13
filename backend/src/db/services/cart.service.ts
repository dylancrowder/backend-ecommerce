
import CartDao from '../dao/cart.dao';


export default class CartService {

    static deleteOrderByEmailAndID(email: string, product_id: number) {
        return CartDao.deleteOrderByEmailAndID(email, product_id)
    }

    static getOrderByEmail(email: string) {
        return CartDao.getOrderByEmail(email)
    }
    static getOrderByEmailandID(email: string, product_id: number) {
        return CartDao.getOrderByEmailandID(email, product_id)
    }
    static updateOrderByEmailID(quantity: number, email: string, product_id: number, size: string) {
        return CartDao.updateOrderByEmailID(quantity, email, product_id, size)
    }
    static addProductToOrder(quantity: number, email: string, product_id: number, size: string, price: number) {

        return CartDao.addProductToOrder(quantity, email, product_id, size, price)

    }

}