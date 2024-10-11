import { ImageSend } from "./ImageSend";

export class ProductSend{
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
    images: ImageSend[] | any;
    imgs?: File[]; 
}