import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAllOrders } from 'src/app/store/actions/order.actions';
import { selectAllOrders } from 'src/app/store/selectors/order.selectors';
import { OrderGet } from 'src/shared/data-get/OrderGet';

@Component({
  selector: 'app-admin-get-orders',
  templateUrl: './admin-get-orders.component.html',
  styleUrls: ['./admin-get-orders.component.css']
})
export class AdminGetOrdersComponent {
  ordersList$ : Observable<OrderGet[]>;

  constructor(private store : Store){
    this.ordersList$ = this.store.select(selectAllOrders);
  }
  ngOnInit(){
    this.store.dispatch(getAllOrders());
  }
  moveToEditform(orderId : number){

  }
  handleRemove(orderId : number){

  }
}
