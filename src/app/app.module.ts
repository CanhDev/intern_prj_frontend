import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ProductEffects } from './store/effects/product.effects';
import { UserEffects } from './store/effects/user.effects';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { CategoryEffects } from './store/effects/category.effects';
import { AccountEffects } from './store/effects/account.effects';
import { DashboardEffects } from './store/effects/dashboard.effects';
import { FeedbackEffects } from './store/effects/feedback.effects';
import { ItemcartEffects } from './store/effects/itemcart.effects';
import { OrderEffects } from './store/effects/order.effects';

import * as fromProduct from './store/reducers/product.reducer';
import * as fromUser from './store/reducers/user.reducer';
import * as fromCategory from './store/reducers/category.reducer';
import * as fromAccount from './store/reducers/account.reducer';
import * as fromDashboard from './store/reducers/dashboard.reducer';
import * as fromFeedback from './store/reducers/feedback.reducer';
import * as fromItemcart from './store/reducers/itemcart.reducer';
import * as fromOrder from './store/reducers/order.reducer';
import * as fromCart from './store/reducers/cart.reducer';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpOptionsService } from 'src/shared/services/generals/http-options.service';
import { AuthInterceptor } from 'src/shared/services/generals/auth.interceptor';
import { CartEffects } from './store/effects/cart.effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    UnauthorizedComponent,
  ],
  imports: [
    MatProgressSpinnerModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    ClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000, 
      positionClass: 'toast-top-center', 
      preventDuplicates: true,
      closeButton: false,
      progressBar: true,
      tapToDismiss: true
    }),
    StoreModule.forRoot({
      product : fromProduct.reducer,
      account : fromAccount.reducer,
      category : fromCategory.reducer,
      dashboard : fromDashboard.reducer,
      feedback : fromFeedback.reducer,
      itemcart : fromItemcart.reducer,
      order : fromOrder.reducer,
      user : fromUser.reducer,
      cart : fromCart.reducer
    }),
    EffectsModule.forRoot([
      ProductEffects,
      AccountEffects,
      CategoryEffects,
      DashboardEffects,
      FeedbackEffects,
      ItemcartEffects,
      OrderEffects,
      UserEffects,
      CartEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forFeature('product', fromProduct.reducer),
    StoreModule.forFeature('account', fromAccount.reducer),
    StoreModule.forFeature('category', fromCategory.reducer),
    StoreModule.forFeature('dashboard', fromDashboard.reducer),
    StoreModule.forFeature('feedback', fromFeedback.reducer),
    StoreModule.forFeature('itemcart', fromItemcart.reducer),
    StoreModule.forFeature('order', fromOrder.reducer),
    StoreModule.forFeature('user', fromUser.reducer),
    StoreModule.forFeature('cart', fromCart.reducer),
    EffectsModule.forFeature([ProductEffects, UserEffects, CategoryEffects, AccountEffects, DashboardEffects, FeedbackEffects, ItemcartEffects, OrderEffects, CartEffects]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
