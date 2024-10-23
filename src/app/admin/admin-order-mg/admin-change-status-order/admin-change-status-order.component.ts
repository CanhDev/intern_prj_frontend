import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetOrder, UpdateOrderStatus } from 'src/app/store/actions/order.actions';
import { selectisLoadingOrder, selectOrder } from 'src/app/store/selectors/order.selectors';
import { OrderGet } from 'src/shared/data-get/OrderGet';
import { OrderStatusSend } from 'src/shared/data-send/OrderStatusSend';

@Component({
  selector: 'app-admin-change-status-order',
  templateUrl: './admin-change-status-order.component.html',
  styleUrls: ['./admin-change-status-order.component.css']
})
export class AdminChangeStatusOrderComponent {
  Order$ : Observable<OrderGet | null>;
  isLoading$ : Observable<boolean>;
  //
  Order!: OrderGet;
  OrderForm! : FormGroup;

  constructor(private store : Store
    , private route : ActivatedRoute, private fb : FormBuilder,
  private router : Router){
    this.Order$ = this.store.select(selectOrder);
    this.isLoading$ = this.store.select(selectisLoadingOrder);
  }
  ngOnInit(){
    this.initForm();
    this.loadOrder();
  }
  initForm(){
    this.OrderForm = this.fb.group({
      orderId : [''],
      statusPayment : ['', Validators.required],
      statusShipping : ['', Validators.required]
    })
  }
  initFormWithData(){
    this.OrderForm.patchValue({
      orderId : this.Order.id,
      statusPayment : this.Order.statusPayment,
      statusShipping : this.Order.statusShipping
    })
  }
  loadOrder(){
    this.route.paramMap.subscribe((params : ParamMap)=>{
      const id = params.get('id');
      if(id){
        this.store.dispatch(GetOrder({orderId : parseInt(id, 10)}));
      }
    });
    this.Order$.subscribe(order =>{
      if(order){
        this.Order = order;
        this.initFormWithData();
      }
    });
  }
  submitForm(){
    if(this.OrderForm.valid){
      let data = new OrderStatusSend();
      data.orderId = this.Order.id;
      data.StatusShipping = this.OrderForm.get('statusShipping')?.value;
      data.statusPayment = this.OrderForm.get('statusPayment')?.value;

      this.store.dispatch(UpdateOrderStatus
        ({OrderStatusModel : data }));
    }
  }
  handleBack(){
    this.router.navigate(['admin/orderManagement']);
  }
}
