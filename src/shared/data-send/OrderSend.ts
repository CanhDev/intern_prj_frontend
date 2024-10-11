import { OrderDetailSend } from "./OrderDetailSend";

export class OrderSend{
    userId : string = "";
    orderCode: string = "";
    orderDate? : Date | null;
    totalAmount : number = 0;
    status : string = "";
    paymentMethod : string = "";
    shippingAddress : string  = "";
    orderDetails : OrderDetailSend[] | any;
}