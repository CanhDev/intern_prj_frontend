import { createFeature, createReducer, on } from '@ngrx/store';
import * as ItemcartActions from '../actions/itemcart.actions';
import { ItemCartGet } from 'src/shared/data-get/ItemCartGet';

export const itemcartFeatureKey = 'itemcart';

export interface State {
  itemsCart : ItemCartGet[];
  itemCartCount : number;
  itemCartTotal : number;
  isLoadingItemsCart : boolean;
  isLoadingUpdate : boolean;
}

export const initialState: State = {
  itemsCart : [],
  itemCartCount : 0,
  itemCartTotal : 0,
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
    itemCartCount : ItemsCart.length,
    itemCartTotal : ItemsCart.reduce((acc, currenValue) => {
      return  acc + currenValue.price;
    }, 0),
    isLoadingItemsCart: false
  })),
  on(ItemcartActions.GetItemsCartByCartIdFailure, (state) =>({
    ...state,
    itemsCart : [],
    itemCartCount : 0,
    itemCartTotal : 0,
    isLoadingItemsCart: false
  })),
  on(ItemcartActions.AddItemCart, (state) =>({
    ...state,
    isLoadingUpdate: true
  })),
  on(ItemcartActions.AddItemCartSuccess, (state, {item}) =>({
    ...state,
    itemsCart : [...state.itemsCart, item],
    itemCartCount : state.itemCartCount + 1,
    itemCartTotal : state.itemCartTotal + item.price,
    isLoadingUpdate: false
  })),
  on(ItemcartActions.AddItemCartFailure, (state) =>({
    ...state,
    isLoadingUpdate: false
  })),
  //
  on(ItemcartActions.EditItemCart, (state) =>{
    return {
      ...state,
    isLoadingUpdate: true
    }
    
  }),
  on(ItemcartActions.EditItemCartSuccess, (state, {item}) => {
    const updatedItemsCart = state.itemsCart.map(itemCart => itemCart.id === item.id ? item : itemCart);
    return {
      ...state,
      itemsCart: updatedItemsCart,
      itemCartTotal: updatedItemsCart.reduce((acc, currenValue) => acc + currenValue.price, 0),
      isLoadingUpdate: false
    };
  }),
  
  on(ItemcartActions.EditItemCartFailure, (state) =>({
    ...state,
    isLoadingUpdate: false
  })),
  //
  on(ItemcartActions.DeleteItemCart, (state) =>({
    ...state,
    isLoadingUpdate: true
  })),
  on(ItemcartActions.DeleteItemCartSuccess, (state, {id}) => {
    const itemToDelete = state.itemsCart.find(item => item.id === id);
    return {
      ...state,
      itemsCart: state.itemsCart ? state.itemsCart.filter(i => i?.id !== id) : [],
      itemCartCount: state.itemCartCount > 0 ? state.itemCartCount - 1 : 0,
      itemCartTotal: itemToDelete ? state.itemCartTotal - itemToDelete.price : state.itemCartTotal,
      isLoadingUpdate: false
    };
  }),
  on(ItemcartActions.DeleteItemCartFailure, (state) =>({
    ...state,
    isLoadingUpdate: false
  })),
)
