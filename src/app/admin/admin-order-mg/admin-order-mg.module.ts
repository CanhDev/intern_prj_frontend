import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGetOrdersComponent } from './admin-get-orders/admin-get-orders.component';
import { AdminChangeStatusOrderComponent } from './admin-change-status-order/admin-change-status-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    AdminGetOrdersComponent,
    AdminChangeStatusOrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ]
})
export class AdminOrderMgModule { }
