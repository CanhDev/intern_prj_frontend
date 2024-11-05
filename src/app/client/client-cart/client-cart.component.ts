import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import { getCart } from 'src/app/store/actions/cart.actions';
import { DeleteAllItemCart, DeleteItemCart, EditItemCart, GetItemsCartByCartId } from 'src/app/store/actions/itemcart.actions';
import { selectCart } from 'src/app/store/selectors/cart.selectors';
import { selectIsLoadingItemsCart, selectisLoadingUpdate, selectItemCartCount, selectItemCartTotal, selectItemsCart } from 'src/app/store/selectors/itemcart.selectors';
import { CartGet } from 'src/shared/data-get/CartGet';
import { ItemCartGet } from 'src/shared/data-get/ItemCartGet';
import { ItemCartSend } from 'src/shared/data-send/ItemCartSend';

@Component({
  selector: 'app-client-cart',
  templateUrl: './client-cart.component.html',
  styleUrls: ['./client-cart.component.css']
})
export class ClientCartComponent implements OnInit, OnDestroy {
  Cart$: Observable<CartGet | null>;
  ItemsCart$: Observable<ItemCartGet[]>;
  IsLoadingItemsCart$: Observable<boolean>;
  isLoadingUpdate$: Observable<boolean>;
  itemCartCount$: Observable<number>;
  itemCartTotal$: Observable<number>;
  isOrder_createString: string = sessionStorage.getItem('isOrder_create') ?? "";
  isOrder_create: boolean = this.isOrder_createString === "true";

  private destroy$ = new Subject<void>();

  constructor(private store: Store, private router: Router) {
    this.ItemsCart$ = this.store.select(selectItemsCart);
    this.IsLoadingItemsCart$ = this.store.select(selectIsLoadingItemsCart);
    this.isLoadingUpdate$ = this.store.select(selectisLoadingUpdate);
    this.Cart$ = this.store.select(selectCart);
    this.itemCartCount$ = this.store.select(selectItemCartCount);
    this.itemCartTotal$ = this.store.select(selectItemCartTotal);
  }

  ngOnInit() {
    this.store.dispatch(getCart());

    this.Cart$.pipe(
      first(),
      map((cart : CartGet | null)=>{
        if(cart){
          if(this.isOrder_create){
            this.store.dispatch(DeleteAllItemCart({ id: cart.id }));
            sessionStorage.removeItem('isOrder_create');
          }
          else{
            this.store.dispatch(GetItemsCartByCartId({ id: cart.id }));
          }
        }
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateQuantity(newQuantity: number, item: ItemCartGet) {
    if (newQuantity <= 0) {
      alert("Số lượng phải lớn hơn 0");
      return;
    }

    const updateItem: ItemCartSend = {
      productId: item.productId,
      cartId: item.cartId,
      quantity: newQuantity,
      price: item.product?.price ? item.product.price * newQuantity : item.price
    };
    this.store.dispatch(EditItemCart({ item: updateItem, id: item.id }));
  }

  removeItem(id: number) {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      this.store.dispatch(DeleteItemCart({ id }));
    }
  }

  moveCheckout() {
    this.router.navigate(['/Checkout']);
  }
}
