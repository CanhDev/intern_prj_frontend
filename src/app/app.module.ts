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
import { HttpClientModule } from '@angular/common/http';
import { HttpOptionsService } from 'src/shared/services/generals/http-options.service';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    UnauthorizedComponent,
  ],
  imports: [
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
      product : fromProduct.reducer
    }),
    EffectsModule.forRoot([
      ProductEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forFeature('product', fromProduct.reducer),
    EffectsModule.forFeature([ProductEffects, UserEffects, CategoryEffects, AccountEffects, DashboardEffects, FeedbackEffects, ItemcartEffects, OrderEffects]),
  ],
  providers: [HttpOptionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
