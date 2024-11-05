import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGetOrdersComponent } from './admin-get-orders/admin-get-orders.component';
import { AdminChangeStatusOrderComponent } from './admin-change-status-order/admin-change-status-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminGetOrderComponent } from './admin-get-order/admin-get-order.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminGetOrdersComponent,
    AdminChangeStatusOrderComponent,
    AdminGetOrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ]
})
export class AdminOrderMgModule { }
