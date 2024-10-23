import { OrderDetailGet } from "./OderDetailGet";
import { UserGet } from "./UserGet";

export class OrderGet{
    id: number = 0;
    userId : string = "";
    user? : UserGet;
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
    orderDetails : OrderDetailGet[] | any;
}