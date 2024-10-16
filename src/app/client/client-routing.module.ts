import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientShopComponent } from './client-shop/client-shop.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ClientProductDetailComponent } from './client-product-detail/client-product-detail.component';
import { ClientLoginFormComponent } from './client-login-form/client-login-form.component';
import { ClientSignupFormComponent } from './client-signup-form/client-signup-form.component';
import { ClientCartComponent } from './client-cart/client-cart.component';
import { ClientCheckoutComponent } from './client-checkout/client-checkout.component';
import { ClientOrderComponent } from './client-order/client-order.component';
import { ClientOrderDetailComponent } from './client-order-detail/client-order-detail.component';
import { ClientUserInfoComponent } from './client-user-info/client-user-info.component';
import { AuthGuard } from 'src/shared/guards/auth.guard';

const routes: Routes = [
  {path: '', component: ClientHomeComponent, data: { animation: 'ClienHomePage' }},
  {path: 'shop', component: ClientShopComponent, data: { animation: 'ClienShopPage' }},
  {path: 'shop/products/:id', component: ClientProductDetailComponent, data: { animation: 'ClienProductDetailPage' }}, 
  {path: 'Login', component: ClientLoginFormComponent, data: { animation: 'LoginPage' }},
  {path: 'Signup', component: ClientSignupFormComponent, data: { animation: 'SignUpPage' }},
  {path: 'Cart', component: ClientCartComponent, canActivate : [AuthGuard], data: { animation: 'ClientCartPage' }},
  {path: 'Checkout', component: ClientCheckoutComponent,  canActivate : [AuthGuard], data: { animation: 'ClientCheckoutPage' }},
  {path: 'Order', component: ClientOrderComponent,  canActivate : [AuthGuard], data: { animation: 'ClientOrderPage' }},
  {path: 'Order/:orderId', component: ClientOrderDetailComponent,  canActivate : [AuthGuard], data: { animation: 'ClientOrderDetailPage' }},
  {path: 'Info', component: ClientUserInfoComponent,  canActivate : [AuthGuard], data: { animation: 'ClientInfoPage' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
