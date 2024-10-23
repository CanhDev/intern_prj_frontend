import { OrderDetailSend } from "./OrderDetailSend";

export class OrderSend{
    userId : string = "";
    orderCode: string = "";
    recipientName : string = "";
    recipientPhone : string = "";
    recipientEmail : string  = "";
    recipientAddress : string  = "";
    orderDate? : Date | null;
    totalAmount : number = 0;
    statusPayment : string = "";
    statusShipping : string = "";
    paymentMethod : string = "";
    orderDetails : OrderDetailSend[] | any;
}