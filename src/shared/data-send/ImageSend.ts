export class ImageSend{
    productId : number = 0;
    imageUrl : string = "";
    constructor(productId: number, imageUrl: string) {
        this.productId = productId;
        this.imageUrl = imageUrl;
    }
}