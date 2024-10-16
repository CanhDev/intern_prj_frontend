import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { ItemCartGet } from 'src/shared/data-get/ItemCartGet';
import { ItemCartSend } from 'src/shared/data-send/ItemCartSend';

export const GetItemsCartByCartId = createAction(
  '[ItemCart/API] get ItemCarts', props<{id : number}>()
);
export const GetItemsCartByCartIdSuccess = createAction(
  '[ItemCart/API] get ItemCarts success', 
  props<{ItemsCart : ItemCartGet[]}>()
);
export const GetItemsCartByCartIdFailure = createAction(
  '[ItemCart/API] get ItemCarts failure', 
  props<{error : string, statusCode : number}>()
);
//
export const  AddItemCart = createAction(
  '[ItemCart/API] add ItemCart',
  props<{item : ItemCartSend}>()
);
export const  AddItemCartSuccess = createAction(
  '[ItemCart/API] add ItemCart success',
  props<{item : ItemCartGet}>()
);
export const  AddItemCartFailure = createAction(
  '[ItemCart/API] add ItemCart failure',
  props<{error : string, statusCode : number}>()
);
//
export const  EditItemCart = createAction(
  '[ItemCart/API] edit ItemCart',
  props<{item : ItemCartSend, id : number}>()
);
export const  EditItemCartSuccess = createAction(
  '[ItemCart/API] edit ItemCart success',
  props<{item : ItemCartGet}>()
);
export const  EditItemCartFailure = createAction(
  '[ItemCart/API] edit ItemCart failure',
  props<{error : string, statusCode : number}>()
);
//
export const  DeleteItemCart = createAction(
  '[ItemCart/API] delete ItemCart',
  props<{id : number}>()
);
export const  DeleteItemCartSuccess = createAction(
  '[ItemCart/API] delete ItemCart success',
  props<{id : number}>()
);
export const  DeleteItemCartFailure = createAction(
  '[ItemCart/API] delete ItemCart failure',
  props<{error : string, statusCode : number}>()
);