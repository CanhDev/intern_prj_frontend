import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetOrder } from 'src/app/store/actions/order.actions';
import { selectisLoadingOrder, selectOrder } from 'src/app/store/selectors/order.selectors';
import { OrderGet } from 'src/shared/data-get/OrderGet';

@Component({
  selector: 'app-admin-get-order',
  templateUrl: './admin-get-order.component.html',
  styleUrls: ['./admin-get-order.component.css']
})
export class AdminGetOrderComponent implements OnInit {

  Order$ : Observable<OrderGet | null>;
  Isloading$ : Observable<boolean>;
  
  constructor(private route : ActivatedRoute, private store : Store,
    private router : Router
  ) {
    this.Order$ = this.store.select(selectOrder);
    this.Isloading$ = this.store.select(selectisLoadingOrder);
   }

  ngOnInit() {
    this.route.paramMap.subscribe((params : ParamMap)=>{
      const id = params.get('id');
      if(id){
        this.store.dispatch(GetOrder({orderId : parseInt(id, 10)}));
      }
    })
  }
  handleBack(){
    this.router.navigate(['admin/orderManagement']);
  }
}
