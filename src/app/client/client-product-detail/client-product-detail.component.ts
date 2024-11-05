import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { getCart } from 'src/app/store/actions/cart.actions';
import { AddItemCart } from 'src/app/store/actions/itemcart.actions';
import { getSingleProduct } from 'src/app/store/actions/product.actions';
import { selectCart } from 'src/app/store/selectors/cart.selectors';
import { selectisLoadingUpdate } from 'src/app/store/selectors/itemcart.selectors';
import { selectIsloadingProduct, selectProduct } from 'src/app/store/selectors/product.selectors';
import { CartGet } from 'src/shared/data-get/CartGet';
import { ProductGet } from 'src/shared/data-get/ProductGet';
import { ItemCartSend } from 'src/shared/data-send/ItemCartSend';

@Component({
  selector: 'app-client-product-detail',
  templateUrl: './client-product-detail.component.html',
  styleUrls: ['./client-product-detail.component.css']
})
export class ClientProductDetailComponent {
  productItem$ : Observable<ProductGet | null>;
  isLoadingProduct$ : Observable<boolean>;
  Cart$ : Observable<CartGet | null>;
  cartId : number = 0;
  isLoadingAddItem$ : Observable<boolean>;

  quantity : number = 1;
  selectedImage: string = '';
  isFading: boolean = false; // Biến để quản lý hiệu ứng fade

  constructor(private store : Store, private toastr : ToastrService, private route : ActivatedRoute) {
    this.productItem$ = this.store.select(selectProduct);
    this.isLoadingProduct$ = this.store.select(selectIsloadingProduct);
    this.Cart$ = this.store.select(selectCart);
    this.isLoadingAddItem$ = this.store.select(selectisLoadingUpdate);
  }

  ngOnInit() {
    this.loadProduct();
    this.store.dispatch(getCart());
    this.Cart$.pipe(
      map((cartItem: any) => {
        if (cartItem) {
          this.cartId = cartItem.id;
        }
      })
    ).subscribe();
  }

  loadProduct() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      if (id) {
        this.store.dispatch(getSingleProduct({ id: parseInt(id, 10) }));
      }
    });
    this.productItem$.subscribe(product => {
      if (product && product.images.length > 0) {
        this.selectedImage = product.images[0].imageUrl;
        this.isFading = true; 
        setTimeout(() => {
          this.isFading = false; 
        }, 150);
      }
    });
  }

  changeImage(image: string) {
    if (this.selectedImage !== image) {
      this.isFading = true; // Kích hoạt hiệu ứng fade-out
      setTimeout(() => {
        this.selectedImage = image;
        this.isFading = false; // Kết thúc hiệu ứng fade-out
      }, 200); // Thời gian khớp với transition trong CSS
    }
  }

  addToCart(productId: number, cartId: number, quantity: number, price: number) {
    const item: ItemCartSend = {
      productId: productId,
      cartId: cartId,
      quantity: quantity,
      price: price,
    };
    this.store.dispatch(AddItemCart({ item }));
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }
}

