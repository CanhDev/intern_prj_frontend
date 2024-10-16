import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetOrder, GetOrdersDetail_client } from 'src/app/store/actions/order.actions';
import { selectIsLoadingOrdersDetail, selectOrder, selectOrdersDetail } from 'src/app/store/selectors/order.selectors';
import { OrderDetailGet } from 'src/shared/data-get/OderDetailGet';
import { OrderGet } from 'src/shared/data-get/OrderGet';

@Component({
  selector: 'app-client-order-detail',
  templateUrl: './client-order-detail.component.html',
  styleUrls: ['./client-order-detail.component.css']
})
export class ClientOrderDetailComponent {
  ordersDetail$ : Observable<OrderDetailGet[]>;
  order$ : Observable<OrderGet | null>;
  isLoadingOrdersDetail$ : Observable<boolean>;

  constructor(private store : Store, private route : ActivatedRoute){
    this.ordersDetail$ = this.store.select(selectOrdersDetail);
    this.order$ = this.store.select(selectOrder);
    this.isLoadingOrdersDetail$ = this.store
      .select(selectIsLoadingOrdersDetail);
  }
  ngOnInit(){
    this.loadOrdersDetail();
  }
  loadOrdersDetail(){
    this.route.paramMap.subscribe((params : ParamMap)=>{
      let orderId = params.get('orderId');
      if(orderId){
        this.store.dispatch(GetOrder({orderId : parseInt(orderId, 10)}));
        this.store
          .dispatch(GetOrdersDetail_client({orderId : parseInt(orderId, 10)}));
      }
    });
  }
}
