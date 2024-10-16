import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientShopComponent } from './client-shop/client-shop.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ClientProductDetailComponent } from './client-product-detail/client-product-detail.component';
import { ClientLoginFormComponent } from './client-login-form/client-login-form.component';
import { ClientSignupFormComponent } from './client-signup-form/client-signup-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ClientCartComponent } from './client-cart/client-cart.component';
import { ClientCheckoutComponent } from './client-checkout/client-checkout.component';
import { ClientOrderComponent } from './client-order/client-order.component';
import { ClientOrderDetailComponent } from './client-order-detail/client-order-detail.component';
import { ClientUserInfoComponent } from './client-user-info/client-user-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    ClientLayoutComponent,
    ClientHomeComponent,
    ClientShopComponent,
    ClientProductDetailComponent,
    ClientLoginFormComponent,
    ClientSignupFormComponent,
    ClientCartComponent,
    ClientCheckoutComponent,
    ClientOrderComponent,
    ClientOrderDetailComponent,
    ClientUserInfoComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    ClientRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class ClientModule { }
