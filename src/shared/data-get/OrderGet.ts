import { OrderDetailGet } from "./OderDetailGet";

export class OrderGet{
    id: number = 0;
    userId : string = "";
    orderCode: string = "";
    recipientName : string = "";
    recipientAddress : string = "";
    recipientPhone : string = "";
    recipientEmail : string  = "";
    orderDate? : Date | null;
    totalAmount : number = 0;
    statusPayment : string = "";
    statusShipping : string = "";
    paymentMethod : string = "";
    shippingAddress : string  = "";
    orderDetails : OrderDetailGet[] | any;
}