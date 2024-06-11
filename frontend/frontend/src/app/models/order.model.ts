export interface Order {
    orderId: number,
    clientId: number,
    addressId: number,
    comment: string,
    order_date: Date,
    shipperId: number
}