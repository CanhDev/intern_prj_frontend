import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCategoryMgComponent } from './admin-category/admin-category-mg/admin-category-mg.component';
import { AdminProductMgComponent } from './admin-product/admin-product-mg/admin-product-mg.component';
import { AdminUserMgComponent } from './admin-user/admin-user-mg/admin-user-mg.component';
import { AdminInfoMgComponent } from './admin-info-mg/admin-info-mg.component';
import { AdminAddProductFormComponent } from './admin-product/admin-add-product-form/admin-add-product-form.component';
import { AdminEditProductFormComponent } from './admin-product/admin-edit-product-form/admin-edit-product-form.component';
import { AdminAddCategoryFormComponent } from './admin-category/admin-add-category-form/admin-add-category-form.component';
import { AdminEditCategoryFormComponent } from './admin-category/admin-edit-category-form/admin-edit-category-form.component';
import { AdminAddUserFormComponent } from './admin-user/admin-add-user-form/admin-add-user-form.component';
import { AdminEditUserFormComponent } from './admin-user/admin-edit-user-form/admin-edit-user-form.component';
import { AdminGetOrdersComponent } from './admin-order-mg/admin-get-orders/admin-get-orders.component';
import { AdminChangeStatusOrderComponent } from './admin-order-mg/admin-change-status-order/admin-change-status-order.component';
import { AdminGetOrderComponent } from './admin-order-mg/admin-get-order/admin-get-order.component';

const routes: Routes = [
  {path : '', component: AdminDashboardComponent, data: { animation: 'AdminDashboardPage' }},
  {path : 'categoryManagement', component: AdminCategoryMgComponent, data: { animation: 'AdmincategoryManagementPage' }},
  {path : 'productManagement', component: AdminProductMgComponent, data: { animation: 'AdminproductManagementPage' }},
  {path : 'userManagement', component: AdminUserMgComponent, data: { animation: 'AdminuserManagementPage' }},
  {path : 'infoManagement', component: AdminInfoMgComponent, data: { animation: 'AdmininfoManagementPage' }},
  {path : 'addProductForm', component: AdminAddProductFormComponent, data: { animation: 'AdminaddProductFormPage' }},
  {path : 'editProductForm/:id', component: AdminEditProductFormComponent, data: { animation: 'AdmineditProductFormPage' }},
  {path : 'addCategoryForm', component: AdminAddCategoryFormComponent, data: { animation: 'AdminaddCategoryFormPage' }},
  {path : 'editCategoryForm/:id', component: AdminEditCategoryFormComponent, data: { animation: 'AdmineditCategoryFormPage' }},
  {path : 'addUserForm', component: AdminAddUserFormComponent, data: { animation: 'AdminaddUserFormPage' }},
  {path : 'editUserForm/:id', component: AdminEditUserFormComponent, data: { animation: 'AdmineditUserFormPage' }},
  {path : 'orderManagement', component: AdminGetOrdersComponent, data: { animation: 'AdminorderManagementPage' }},
  {path : 'orderManagement/:id', component: AdminChangeStatusOrderComponent, data: { animation: 'AdminorderManagementEditPage' }},
  {path : 'orderManagement/viewdetail/:id', component: AdminGetOrderComponent, data: { animation: 'AdminorderManagementDetailPage' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
