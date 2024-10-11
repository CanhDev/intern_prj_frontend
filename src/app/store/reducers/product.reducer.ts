import { createFeature, createReducer, on } from '@ngrx/store';
import * as ProductActions from  '../actions/product.actions';
import { ProductGet } from 'src/shared/data-get/ProductGet';
export const productFeatureKey = 'product';

export interface State{
  products: ProductGet[];
  product : ProductGet | null;
  isLoadingProducts : boolean;
  isLoadingProduct : boolean;
}

export const initialState: State = {
  products : [],
  product: null,
  isLoadingProducts: false,
  isLoadingProduct : false
};
export const reducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) =>({
      ...state,
      isLoadingProducts: true
  })),
  on(ProductActions.loadProductsSuccess, (state, {products}) =>({
      ...state,
      products: products,
      isLoadingProducts: false
  })),
  on(ProductActions.loadProductsFailure, state =>({
      ...state,
      products : [],
      isLoadingProducts: false
  })),
  on(ProductActions.getSingleProduct, (state) =>({
    ...state,
    isLoadingProduct: true
})),
on(ProductActions.getSingleProductSuccess, (state, {product}) =>({
    ...state,
    product: product,
    isLoadingProduct: false
})),
on(ProductActions.getSingleProductFailure, state =>({
    ...state,
    product : null,
    isLoadingProduct: false
})),
  on(ProductActions.addProductSuccess, (state, {product})=>({
      ...state,
      products: [...state.products, product]
  })),
  on(ProductActions.addProductFailure, state =>({
      ...state, 
  })),
  on(ProductActions.editProduct, (state) =>({
      ...state,
      isLoadingProduct: true
  })),
  on(ProductActions.editProductSuccess, (state, { product }) => ({
      ...state,
      isLoadingProduct: false,
      products: state.products.map(p => p.id == product.id ? product : p)
    })),
  on(ProductActions.editProductFailure, state =>({
      ...state,
      isLoadingProduct: false,
  })),
  on(ProductActions.deleteProduct, (state) => ({
    ...state,
    isLoadingProducts : true,
  })),
  on(ProductActions.deleteProductSuccess, (state, { id }) => ({
      ...state,
      isLoadingProducts : false,
      products: state.products ? state.products.filter((p) => p?.id !== id) : []
  })),
  
  on(ProductActions.deleteProductFailure, state =>({
      ...state,
      isLoadingProducts : false
  }))
)