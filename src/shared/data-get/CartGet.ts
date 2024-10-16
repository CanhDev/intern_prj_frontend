import { ItemCartGet } from "./ItemCartGet";

export class CartGet{
    id : number = 0;
    productTypeQuan : number = 0;
    createDate? : Date;
    userId? : number;
    itemCarts : ItemCartGet[] | any;
}


