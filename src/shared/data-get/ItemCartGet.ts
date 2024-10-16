import { ProductGet } from "./ProductGet";

export class ItemCartGet{
    id :  number = 0;
    productId : number  = 0;
    cartId : number = 0;
    quantity : number = 0;
    price : number = 0;
    product : ProductGet | undefined;
}