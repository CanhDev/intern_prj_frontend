import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

//admin field
export const selectUserList = createSelector(
  selectUserState,
  (state : fromUser.State) => state.userList);

export const selectUserItem = createSelector(
  selectUserState,
  (state : fromUser.State) => state.user_item);  

export const selectisLoadingUserList = createSelector(
  selectUserState,
  (state : fromUser.State) => state.isLoadingUserList);  

export const selectisLoadingUser_item = createSelector(
  selectUserState,
  (state : fromUser.State) => state.isLoadingUser_item); 
  
//client field
export const selectUser_client = createSelector(
  selectUserState,
  (state : fromUser.State) => state.user_client);

export const selectisLoadingUser_client = createSelector(
  selectUserState,
  (state : fromUser.State) => state.isLoadingUser_client);