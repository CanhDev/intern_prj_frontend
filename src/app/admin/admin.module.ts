import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminInfoMgComponent } from './admin-info-mg/admin-info-mg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminProductModule } from './admin-product/admin-product.module';
import { AdminCategoryModule } from './admin-category/admin-category.module';
import { AdminUserModule } from './admin-user/admin-user.module';
import { AdminOrderMgModule } from './admin-order-mg/admin-order-mg.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminDashboardComponent,
    AdminInfoMgComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    AdminProductModule,
    AdminCategoryModule,
    AdminUserModule,
    AdminOrderMgModule
  ]
})
export class AdminModule { }
