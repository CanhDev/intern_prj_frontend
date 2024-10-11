import { createFeature, createReducer, on } from '@ngrx/store';
import * as CategoryActions from '../actions/category.actions'
import { CategoryGet } from 'src/shared/data-get/CategoryGet';

export const categoryFeatureKey = 'category';

export interface State {
  categories : CategoryGet[];
  category : CategoryGet | null;
  isLoadingCategories : boolean;
  isLoadingCategory : boolean;
}

export const initialState: State = {
  categories : [],
  category : null,
  isLoadingCategories : false,
  isLoadingCategory : false
};

export const reducer = createReducer(
  initialState,

  //getAll
  on(CategoryActions.getCategories, (state) =>({
    ...state,
    isLoadingCategories: true
  })),
  on(CategoryActions.getCategoriesSuccess, (state, {categories}) =>({
    ...state,
    categories: categories,
    isLoadingCategories: false
  })),
  on(CategoryActions.getCategoriesFailure, (state) =>({
    ...state,
    categories: [],
    isLoadingCategories: false
  })),

  //get single
  on(CategoryActions.getCategory, (state) =>({
    ...state,
    isLoadingCategory: true
  })),
  on(CategoryActions.getCategorySuccess, (state, {item}) =>({
    ...state,
    category : item,
    isLoadingCategory: false
  })),
  on(CategoryActions.getCategoryFailure, (state,) =>({
    ...state,
    category : null,
    isLoadingCategory: false
  })),

  // add operation
  on(CategoryActions.addCategory, (state) =>({
    ...state,
    isLoadingCategory: true
  })),
  on(CategoryActions.addCategorySuccess, (state, {item}) =>({
    ...state,
    categories : [...state.categories, item],
    isLoadingCategory: false
  })),
  on(CategoryActions.addCategoryFailure, (state) =>({
    ...state,
    isLoadingCategory: false
  })),

  // edit operation
  on(CategoryActions.editCategory, (state) =>({
    ...state,
    isLoadingCategory: true
  })),
  on(CategoryActions.editCategorySuccess, (state, {item}) =>({
    ...state,
    categories : state.categories.map(category => category.id === item.id ? item : category),
    isLoadingCategory: false
  })),
  on(CategoryActions.editCategoryFailure, (state) =>({
    ...state,
    isLoadingCategory: false
  })),

  //delete operation
  on(CategoryActions.deleteCategory, (state) =>({
    ...state,
    isLoadingCategory: true
  })),
  on(CategoryActions.deleteCategorySuccess, (state, {id}) =>({
    ...state,
    categories: state.categories ? state.categories.filter((c) => c?.id !== id) : [],
    isLoadingCategory: false
  })),
  on(CategoryActions.deleteCategoryFailure, (state) =>({
    ...state,
    isLoadingCategory: false
  })),
)
