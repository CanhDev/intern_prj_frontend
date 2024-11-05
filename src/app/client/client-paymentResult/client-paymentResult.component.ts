import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, map, Observable } from 'rxjs';
import { getCart } from 'src/app/store/actions/cart.actions';
import { DeleteAllItemCart } from 'src/app/store/actions/itemcart.actions';
import { CreateOrder } from 'src/app/store/actions/order.actions';
import { selectCart } from 'src/app/store/selectors/cart.selectors';
import { CartGet } from 'src/shared/data-get/CartGet';
import { OrderSend } from 'src/shared/data-send/OrderSend';

@Component({
  selector: 'app-client-paymentResult',
  templateUrl: './client-paymentResult.component.html',
  styleUrls: ['./client-paymentResult.component.css']
})
export class ClientPaymentResultComponent implements OnInit {


  success: boolean | null = null;
   orderVnpString = sessionStorage.getItem('order_vnp');
   order_vnp: OrderSend | null = this.orderVnpString ? JSON.parse(this.orderVnpString) : null;

  constructor(private route: ActivatedRoute, private store : Store) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.success = params['status'] === 'True';
      if(this.success && this.order_vnp != null){
          this.store.dispatch(CreateOrder({item : this.order_vnp}));
      }
      sessionStorage.removeItem('order_vnp');
    });
  }
}
