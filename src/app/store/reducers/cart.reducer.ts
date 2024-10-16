import { createFeature, createReducer, on } from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';
import { CartGet } from 'src/shared/data-get/CartGet';

export const cartFeatureKey = 'cart';

export interface State {
  cart : CartGet | null;
  isLoadingCart : boolean;
}

export const initialState: State = {
  cart : null,
  isLoadingCart : false
};

export const reducer = createReducer(
  initialState,
  on(CartActions.getCart, (state) =>({
    ...state,
    isLoadingCart: true
  })),
  on(CartActions.getCartSuccess, (state, {cart}) =>({
    ...state,
    cart : cart,
    isLoadingCart: false
  })),
  on(CartActions.getCartFailure, (state) =>({
    ...state,
    cart : null,
    isLoadingCart: false
  })),
)


