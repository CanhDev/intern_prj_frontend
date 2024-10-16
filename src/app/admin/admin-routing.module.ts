import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCategoryMgComponent } from './admin-category-mg/admin-category-mg.component';
import { AdminProductMgComponent } from './admin-product-mg/admin-product-mg.component';
import { AdminUserMgComponent } from './admin-user-mg/admin-user-mg.component';
import { AdminInfoMgComponent } from './admin-info-mg/admin-info-mg.component';
import { AdminAddProductFormComponent } from './admin-add-product-form/admin-add-product-form.component';
import { AdminEditProductFormComponent } from './admin-edit-product-form/admin-edit-product-form.component';
import { AdminAddCategoryFormComponent } from './admin-add-category-form/admin-add-category-form.component';
import { AdminEditCategoryFormComponent } from './admin-edit-category-form/admin-edit-category-form.component';
import { AdminAddUserFormComponent } from './admin-add-user-form/admin-add-user-form.component';
import { AdminEditUserFormComponent } from './admin-edit-user-form/admin-edit-user-form.component';

const routes: Routes = [
  {path : '', component: AdminDashboardComponent},
  {path : 'categoryManagement', component: AdminCategoryMgComponent},
  {path : 'productManagement', component: AdminProductMgComponent},
  {path : 'userManagement', component: AdminUserMgComponent},
  {path : 'infoManagement', component: AdminInfoMgComponent},
  {path : 'addProductForm', component: AdminAddProductFormComponent},
  {path : 'editProductForm/:id', component: AdminEditProductFormComponent},
  {path : 'addCategoryForm', component: AdminAddCategoryFormComponent},
  {path : 'editCategoryForm/:id', component: AdminEditCategoryFormComponent},
  {path : 'addUserForm', component: AdminAddUserFormComponent},
  {path : 'editUserForm/:id', component: AdminEditUserFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
