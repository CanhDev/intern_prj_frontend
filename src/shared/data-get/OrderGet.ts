import { OrderDetailGet } from "./OderDetailGet";

export class OrderGet{
    id: number = 0;
    userId : string = "";
    orderCode: string = "";
    orderDate? : Date | null;
    totalAmount : number = 0;
    status : string = "";
    paymentMethod : string = "";
    shippingAddress : string  = "";
    orderDetails : OrderDetailGet[] | any;
}