import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserMgComponent } from './admin-user-mg/admin-user-mg.component';
import { AdminAddUserFormComponent } from './admin-add-user-form/admin-add-user-form.component';
import { AdminEditUserFormComponent } from './admin-edit-user-form/admin-edit-user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    AdminUserMgComponent,
    AdminAddUserFormComponent,
    AdminEditUserFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ]
})
export class AdminUserModule { }
