import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { getCart } from 'src/app/store/actions/cart.actions';
import { GetItemsCartByCartId } from 'src/app/store/actions/itemcart.actions';
import { CreateOrder } from 'src/app/store/actions/order.actions';
import { GetUserAsync_Client } from 'src/app/store/actions/user.actions';
import { selectCart, selectIsLoadingCart } from 'src/app/store/selectors/cart.selectors';
import { selectItemCartTotal, selectItemsCart } from 'src/app/store/selectors/itemcart.selectors';
import { selectUser_client } from 'src/app/store/selectors/user.selectors';
import { CartGet } from 'src/shared/data-get/CartGet';
import { ItemCartGet } from 'src/shared/data-get/ItemCartGet';
import { UserGet } from 'src/shared/data-get/UserGet';
import { OrderDetailSend } from 'src/shared/data-send/OrderDetailSend';
import { OrderSend } from 'src/shared/data-send/OrderSend';

@Component({
  selector: 'app-client-checkout',
  templateUrl: './client-checkout.component.html',
  styleUrls: ['./client-checkout.component.css']
})
export class ClientCheckoutComponent {

  //Observable variable
  Cart$ : Observable<CartGet | null>;
  CartItems$ : Observable<ItemCartGet[]>;
  TotalAmount$ : Observable<number>;
  isLoadingCart$ : Observable<boolean>
  User$ : Observable<UserGet | null>;

  //
  CartId : number | null = null;
  UserId : string = "";
  TotalAmount : number = 0;
  CheckOutForm! : FormGroup;
  Order_client! : OrderSend | null;
  OrderDetails_client : OrderDetailSend[] = [];

  constructor(private store : Store, private router : Router, private toastr : ToastrService){
    this.Cart$ = this.store.select(selectCart);
    this.CartItems$ = this.store.select(selectItemsCart);
    this.isLoadingCart$ = this.store.select(selectIsLoadingCart);
    this.TotalAmount$ = this.store.select(selectItemCartTotal);
    this.User$ = this.store.select(selectUser_client);
  }
  ngOnInit(){
    this.store.dispatch(getCart());
    this.store.dispatch(GetUserAsync_Client());
    //
    this.Cart$.pipe(
      map((res : CartGet | any) => {
        if(res){
          this.CartId = res.id;
          this.store.dispatch(GetItemsCartByCartId({id: res.id}));
        }
      })
    ).subscribe();
    //
    this.User$.pipe(
      map((res : UserGet | any) => {
        if(res){
          this.UserId = res.id;
        }
      }
    )).subscribe();
    this.TotalAmount$.pipe(
      map((res : number)=>{
        this.TotalAmount = res
      })
    ).subscribe();
    this.initForm();
  }
  initForm(){
    this.CheckOutForm = new FormGroup({
      recipientName : new FormControl('', Validators.required),
      recipientPhone : new FormControl('', [Validators.required, Validators.pattern('^(0?)([3|5|7|8|9])[0-9]{8}$')]),
      recipientEmail : new FormControl('', [Validators.required, Validators.email]),
      recipientAddress : new FormControl('', Validators.required)
    })
  }
  get recipientName(){return this.CheckOutForm.get('recipientName')}
  get recipientPhone(){return this.CheckOutForm.get('recipientPhone')}
  get recipientEmail(){return this.CheckOutForm.get('recipientEmail')}
  get recipientAddress(){return this.CheckOutForm.get('recipientAddress')}

  generateOrderCode(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2); 
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
    const day = currentDate.getDate().toString().padStart(2, '0'); 
    const randomNum = Math.floor(1000 + Math.random() * 9000); 
    const orderCode = `ORD${year}${month}${day}${randomNum}`;
    return orderCode;
  }
  
  
  submitForm() {
    if (this.CheckOutForm.valid) {
      this.CartItems$.pipe(
        map((items: ItemCartGet[] | any) => {
          if (items) {
            items.forEach((item: ItemCartGet) => {
              this.OrderDetails_client.push({
                productId: item.productId,
                unitPrice: item.product?.price || 0,
                unitQuantity: item.quantity
              });
            });
          }
        })
      ).subscribe({
        next: () => {
          this.Order_client = {
            userId : this.UserId,
            orderCode : this.generateOrderCode(),
            recipientName : this.recipientName?.value.trim(),
            recipientPhone : this.recipientPhone?.value.trim(),
            recipientEmail: this.recipientEmail?.value.trim(),
            recipientAddress: this.recipientAddress?.value.trim(),
            orderDate : new Date(),
            totalAmount: this.TotalAmount,
            statusPayment : "Chưa thanh toán",
            statusShipping : "Đang chờ xử lý",
            paymentMethod : "Thanh toán khi nhận hàng",
            orderDetails : this.OrderDetails_client
          };
          console.log(this.Order_client);
          this.store.dispatch(CreateOrder({item : this.Order_client }));
        },
        error: (err) => {
          console.error('Error while processing cart items', err);
        }
      });
    } else {
      this.toastr.error("Form không hợp lệ", "Thông báo");
    }
  }
}
