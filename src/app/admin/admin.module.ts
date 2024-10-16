import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminProductMgComponent } from './admin-product-mg/admin-product-mg.component';
import { AdminCategoryMgComponent } from './admin-category-mg/admin-category-mg.component';
import { AdminUserMgComponent } from './admin-user-mg/admin-user-mg.component';
import { AdminInfoMgComponent } from './admin-info-mg/admin-info-mg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminAddProductFormComponent } from './admin-add-product-form/admin-add-product-form.component';
import { AdminEditProductFormComponent } from './admin-edit-product-form/admin-edit-product-form.component';
import { AdminAddCategoryFormComponent } from './admin-add-category-form/admin-add-category-form.component';
import { AdminEditCategoryFormComponent } from './admin-edit-category-form/admin-edit-category-form.component';
import { AdminAddUserFormComponent } from './admin-add-user-form/admin-add-user-form.component';
import { AdminEditUserFormComponent } from './admin-edit-user-form/admin-edit-user-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminDashboardComponent,
    AdminProductMgComponent,
    AdminCategoryMgComponent,
    AdminUserMgComponent,
    AdminInfoMgComponent,
    AdminAddProductFormComponent,
    AdminEditProductFormComponent,
    AdminAddCategoryFormComponent,
    AdminEditCategoryFormComponent,
    AdminAddUserFormComponent,
    AdminEditUserFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class AdminModule { }
