import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductMgComponent } from './admin-product-mg/admin-product-mg.component';
import { AdminAddProductFormComponent } from './admin-add-product-form/admin-add-product-form.component';
import { AdminEditProductFormComponent } from './admin-edit-product-form/admin-edit-product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    AdminProductMgComponent,
    AdminAddProductFormComponent,
    AdminEditProductFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ]
})
export class AdminProductModule { }
