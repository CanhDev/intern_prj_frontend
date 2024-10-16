import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { GetOrdersByUser } from 'src/app/store/actions/order.actions';
import { GetUserAsync_Client } from 'src/app/store/actions/user.actions';
import { selectOrders } from 'src/app/store/selectors/order.selectors';
import { selectUser_client } from 'src/app/store/selectors/user.selectors';
import { OrderDetailGet } from 'src/shared/data-get/OderDetailGet';
import { OrderGet } from 'src/shared/data-get/OrderGet';
import { UserGet } from 'src/shared/data-get/UserGet';

@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.css']
})
export class ClientOrderComponent {
  User$ : Observable<UserGet | null>;
  Orders$ : Observable<OrderGet[]>
  //
  userId! : string;
  orderDetailList : OrderDetailGet[] = []
  constructor(private store : Store){
    this.User$ = this.store.select(selectUser_client);
    this.Orders$ = this.store.select(selectOrders);
  }
  ngOnInit(){
    this.store.dispatch(GetUserAsync_Client());
    //
    this.User$.pipe(
      map((user : UserGet | any) =>{
        if(user){
          this.userId = user.id;
          this.store.dispatch(GetOrdersByUser({userId : this.userId}))
        }
      })
    ).subscribe();
  }
}
