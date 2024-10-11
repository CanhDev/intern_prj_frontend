import { createFeature, createReducer, on } from '@ngrx/store';
import * as ItemcartActions from '../actions/itemcart.actions';
import { ItemCartGet } from 'src/shared/data-get/ItemCartGet';

export const itemcartFeatureKey = 'itemcart';

export interface State {
  itemsCart : ItemCartGet[];
  isLoadingItemsCart : boolean;
  isLoadingUpdate : boolean;
}

export const initialState: State = {
  itemsCart : [],
  isLoadingItemsCart : false,
  isLoadingUpdate : false
};

export const reducer = createReducer(
  initialState,
  on(ItemcartActions.GetItemsCartByCartId, (state) =>({
    ...state,
    isLoadingItemsCart: true
  })),
  on(ItemcartActions.GetItemsCartByCartIdSuccess, (state, {ItemsCart}) =>({
    ...state,
    itemsCart : ItemsCart,
    isLoadingItemsCart: false
  })),
  on(ItemcartActions.GetItemsCartByCartIdFailure, (state) =>({
    ...state,
    itemsCart : [],
    isLoadingItemsCart: false
  })),
  on(ItemcartActions.AddItemCart, (state) =>({
    ...state,
    isLoadingUpdate: true
  })),
  on(ItemcartActions.AddItemCartSuccess, (state, {item}) =>({
    ...state,
    itemsCart : [...state.itemsCart, item],
    isLoadingUpdate: false
  })),
  on(ItemcartActions.AddItemCartFailure, (state) =>({
    ...state,
    isLoadingUpdate: false
  })),
  //
  on(ItemcartActions.EditItemCart, (state) =>({
    ...state,
    isLoadingUpdate: true
  })),
  on(ItemcartActions.EditItemCartSuccess, (state, {item}) =>({
    ...state,
    itemsCart : state.itemsCart
    .map(itemCart => item.id === item.id ? item : itemCart),
    isLoadingUpdate: false
  })),
  on(ItemcartActions.EditItemCartFailure, (state) =>({
    ...state,
    isLoadingUpdate: false
  })),
  //
  on(ItemcartActions.DeleteItemCart, (state) =>({
    ...state,
    isLoadingUpdate: true
  })),
  on(ItemcartActions.DeleteItemCartSuccess, (state, {id}) =>({
    ...state,
    itemsCart: state.itemsCart ? state.itemsCart
      .filter((i) => i?.id !== id) : [],
    isLoadingUpdate: false
  })),
  on(ItemcartActions.DeleteItemCartFailure, (state) =>({
    ...state,
    isLoadingUpdate: false
  })),
)
