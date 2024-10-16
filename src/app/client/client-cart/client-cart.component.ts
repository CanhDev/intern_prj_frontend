import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { getCart } from 'src/app/store/actions/cart.actions';
import { DeleteItemCart, EditItemCart, GetItemsCartByCartId } from 'src/app/store/actions/itemcart.actions';
import { selectCart } from 'src/app/store/selectors/cart.selectors';
import { selectIsLoadingItemsCart, selectItemCartCount, selectItemCartTotal, selectItemsCart } from 'src/app/store/selectors/itemcart.selectors';
import { CartGet } from 'src/shared/data-get/CartGet';
import { ItemCartGet } from 'src/shared/data-get/ItemCartGet';
import { ItemCartSend } from 'src/shared/data-send/ItemCartSend';

@Component({
  selector: 'app-client-cart',
  templateUrl: './client-cart.component.html',
  styleUrls: ['./client-cart.component.css']
})
export class ClientCartComponent {
  Cart$: Observable<CartGet | null>;
  ItemsCart$: Observable<ItemCartGet[]>;
  IsLoadingItemsCart$: Observable<boolean>;
  //
  itemCartCount$ : Observable<number>;
  itemCartTotal$ : Observable<number>;

  //


  constructor(private store: Store, private router : Router) {
    this.ItemsCart$ = this.store.select(selectItemsCart);
    this.IsLoadingItemsCart$ = this.store.select(selectIsLoadingItemsCart);
    this.Cart$ = this.store.select(selectCart);
    this.itemCartCount$ = this.store.select(selectItemCartCount);
    this.itemCartTotal$ = this.store.select(selectItemCartTotal);
  }

  ngOnInit() {
    this.store.dispatch(getCart());
    this.Cart$.subscribe(
      (res : any)=>{
        if(res){
          this.store.dispatch(GetItemsCartByCartId({id: res.id}));
        }
      })
  }

  updateQuantity(newQuantity : number, item: ItemCartGet) {
    const updateItem : ItemCartSend = {
      productId : item.productId,
      cartId : item.cartId,
      quantity : newQuantity,
      price : item.product?.price ?  item.product.price * newQuantity : item.price
    };
    this.store.dispatch(EditItemCart({item : updateItem, id: item.id}));
  }

  removeItem(id: number) {
    let confirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (confirm) {
      this.store.dispatch(DeleteItemCart({ id: id }));
    }
  }
  moveCheckout(){
    this.router.navigate(['/Checkout']);
  }
}
