import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCategory from '../reducers/category.reducer';

export const selectCategoryState = createFeatureSelector<fromCategory.State>(
  fromCategory.categoryFeatureKey
);

export const selectCategories = createSelector(
  selectCategoryState,
  (state : fromCategory.State) => state.categories);

export const selectCategory = createSelector(
  selectCategoryState,
  (state : fromCategory.State) => state.category);

export const selectIsLoadingCategories = createSelector(
  selectCategoryState, 
  (state : fromCategory.State) => state.isLoadingCategories);

  export const selectIsLoadingCategory = createSelector(
    selectCategoryState, 
    (state : fromCategory.State) => state.isLoadingCategory);