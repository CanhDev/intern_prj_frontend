// src/app/store/actions/product.actions.ts

import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ProductGet } from 'src/shared/data-get/ProductGet';
import { ProductSend } from 'src/shared/data-send/ProductSend';

export const loadProducts = createAction(
  '[Product/API] Load Products',
   props<{typeId? : number | null, sortString?: string, filterString? : string,
     pageNumber? : number, pageSize? : number}>()
);

export const loadProductsSuccess = createAction(
  '[Product/API] Load Products Success',
  props<{ products: ProductGet[], totalProduct: number }>() 
);

export const loadProductsFailure = createAction(
  '[Product/API] Load Products Failure',
   props<{ error: string; statusCode: number }>()
);

export const getSingleProduct = createAction(
  '[Product/API] Get Single Product',
  props<{id : number}>());

export const getSingleProductSuccess = createAction(
    '[Product/API] Get Single Product Succes',
    props<{product : ProductGet}>());

export const getSingleProductFailure = createAction(
      '[Product/API] Get Single Product Failure', props<{ error: string; statusCode: number }>());


export const addProduct = createAction(
  '[Product/API] Add Product',
  props<{ product: FormData }>() 
);

export const addProductSuccess = createAction(
  '[Product/API] Add Product Success',
  props<{ product: ProductGet }>() 
);

export const addProductFailure = createAction(
  '[Product/API] Add Product Failure', props<{ error: string; statusCode: number }>()
);

export const editProduct = createAction(
  '[Product/API] Edit Product',
  props<{ product: FormData, id : number }>() 
);

export const editProductSuccess = createAction(
  '[Product/API] Edit Product Success',
  props<{ product: ProductGet }>() 
);

export const editProductFailure = createAction(
  '[Product/API] Edit Product Failure', props<{ error: string; statusCode: number }>()
);

export const deleteProduct = createAction(
  '[Product/API] Delete Product',
  props<{ id: number }>() 
);

export const deleteProductSuccess = createAction(
  '[Product/API] Delete Product Success',
  props<{ id: number }>() 
);

export const deleteProductFailure = createAction(
  '[Product/API] Delete Product Failure', props<{ error: string; statusCode: number }>()
);
