import { Order } from "../order.model";
import { Product } from "../products.model";

export class OrderRequest {
    public order: Order
    public products: Product[] = []
    public quantities: number[] = []
    constructor(order: Order, products: Product[], quantities: number[]) {
        this.order = order
        this.products = products
        this.quantities = quantities
    }
}