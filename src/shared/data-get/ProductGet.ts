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
    soldedCount?: number | null; 
    images: ImageGet[] | any;
}