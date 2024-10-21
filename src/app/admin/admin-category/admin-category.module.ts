import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCategoryMgComponent } from './admin-category-mg/admin-category-mg.component';
import { AdminAddCategoryFormComponent } from './admin-add-category-form/admin-add-category-form.component';
import { AdminEditCategoryFormComponent } from './admin-edit-category-form/admin-edit-category-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    AdminCategoryMgComponent,
    AdminAddCategoryFormComponent,
    AdminEditCategoryFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ]
})
export class AdminCategoryModule { }
