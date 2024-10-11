import { createAction, emptyProps, props } from '@ngrx/store';
import { CategoryGet } from 'src/shared/data-get/CategoryGet';
import { CategorySend } from 'src/shared/data-send/CategorySend';


export const getCategories =
 createAction('[Category/API] get categories');
export const getCategoriesSuccess = createAction(
  '[Category/API] get categories success',
   props<{categories : CategoryGet[]}>()
)
export const getCategoriesFailure = createAction(
  '[Category/API] get categories failure',
  props<{ error: string, statusCode: number }>()
)

export const getCategory = createAction(
  '[Category/API] get category', props<{id : number}>()
)
export const getCategorySuccess = createAction(
  '[Category/API] get category sucess', props<{item : CategoryGet}>()
)
export const getCategoryFailure = createAction(
  '[Category/API] get category failure',
  props<{ error: string; statusCode: number }>()
  
)

export const addCategory = createAction(
  '[Category/API] add category', props<{item : CategorySend}>()
)
export const addCategorySuccess = createAction(
  '[Category/API] add category success', props<{item: CategoryGet}>()
)
export const addCategoryFailure = createAction(
  '[Category/API] add category failure',
  props<{ error: string; statusCode: number }>()
)

export const editCategory = createAction(
  '[Category/API] edit category', props<{item : CategorySend, id: number}>()
)
export const editCategorySuccess = createAction(
  '[Category/API] edit category success', props<{item: CategoryGet}>()
)
export const editCategoryFailure = createAction(
  '[Category/API] edit category failure',
  props<{ error: string; statusCode: number }>()
)

export const deleteCategory = createAction(
  '[Category/API] delete category', props<{id : number}>()
)
export const deleteCategorySuccess = createAction(
  '[Category/API] edit category success', props<{id : number}>()
)
export const deleteCategoryFailure = createAction(
  '[Category/API] edit category failure',
  props<{ error: string; statusCode: number }>()
)