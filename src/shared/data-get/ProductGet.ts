import { CategoryGet } from "./CategoryGet";
import { ImageGet } from "./ImageGet";

export class ProductGet{
    id : number = 0;
    name: string = "";
    description: string = "";
    quantity: number = 0;
    originalPrice: number = 0;
    price: number = 0;
    createDate?: Date | null; 
    updateDate?: Date | null; 
    categoryId?: number | null; 
    size?: string | null; 
    soldedCount?: number  = 0; 
    images: ImageGet[] | any;
    category : CategoryGet | any;
}