import { createFeature, createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { UserGet } from 'src/shared/data-get/UserGet';

export const userFeatureKey = 'user';

export interface State {
  //admin field
  userList : UserGet[];
  user_item : UserGet | null;
  isLoadingUserList : boolean;
  isLoadingUser_item: boolean;
  //client field
  user_client : UserGet | null;
  isLoadingUser_client : boolean;
}

export const initialState: State = {
  //admin field
  userList : [],
  user_item : null,
  isLoadingUserList : false,
  isLoadingUser_item : false,
  //client field
  user_client : null, 
  isLoadingUser_client : false
};

export const reducer = createReducer(
  initialState,
  //admin field
  //get list user
  on(UserActions.GetUsers_Admin, (state) =>({
    ...state,
    isLoadingUserList: true
  })),
  on(UserActions.GetUsers_AdminSuccess, (state, {userList}) =>({
    ...state,
    userList : userList,
    isLoadingUserList: false
  })),
  on(UserActions.GetUsers_AdminFailure, (state) =>({
    ...state,
    userList : [],
    isLoadingUserList: false
  })),

  //get user item
  on(UserActions.GetUser_Admin, (state) =>({
    ...state,
    isLoadingUser_item: true
  })),
  on(UserActions.GetUser_AdminSuccess, (state, {user_item}) =>({
    ...state,
    user_item : user_item,
    isLoadingUser_item: false
  })),
  on(UserActions.GetUser_AdminFailure, (state) =>({
    ...state,
    user_item : null,
    isLoadingUser_item: false
  })),

  //add user item
  on(UserActions.CreateUserAsync_Admin, (state) =>({
    ...state,
    isLoadingUser_item: true
  })),
  on(UserActions.CreateUserAsync_AdminSuccess, (state, {user_item}) =>({
    ...state,
    userList : [...state.userList, user_item],
    isLoadingUser_item: false
  })),
  on(UserActions.CreateUserAsync_AdminFailure, (state) =>({
    ...state,
    isLoadingUser_item: false
  })),

  //update user item
  on(UserActions.UpdateUserAsync_Admin, (state) =>({
    ...state,
    isLoadingUser_item: true
  })),
  on(UserActions.UpdateUserAsync_AdminSuccess, (state, {user_item}) =>({
    ...state,
    userList : state.userList
      .map(item => item.id === user_item.id ? user_item : item),
    isLoadingUser_item: false
  })),
  on(UserActions.UpdateUserAsync_AdminFailure, (state) =>({
    ...state,
    isLoadingUser_item: false
  })),
  //delete user item
  on(UserActions.DeleteUserAsync_Admin, (state) =>({
    ...state,
    isLoadingUser_item: true
  })),
  on(UserActions.DeleteUserAsync_AdminSuccess, (state, {userId}) =>({
    ...state,
    userList : state.userList ? state.userList
      .filter((u) => u.id != userId) : [],
    isLoadingUser_item: false
  })),
  on(UserActions.DeleteUserAsync_AdminFailure, (state) =>({
    ...state,
    isLoadingUser_item: false
  })),

  //client field
  // get user_client
  on(UserActions.ClearUser_client, (state) =>({
    ...state,
    user_client: null,
  })),
  on(UserActions.GetUserAsync_Client, (state) =>({
    ...state,
    isLoadingUser_client: true
  })),
  on(UserActions.GetUserAsync_ClientSuccess, (state, {user_client}) =>({
    ...state,
    user_client : user_client,
    isLoadingUser_client: false
  })),
  on(UserActions.GetUserAsync_ClientFailure, (state) =>({
    ...state,
    user_client : null,
    isLoadingUser_client: false
  })),
  //update user_client infomation

  on(UserActions.UpdateUserAsync_Client, (state) =>({
    ...state,
    isLoadingUser_client: true
  })),
  on(UserActions.UpdateUserAsync_ClientSuccess, (state, {user_client}) =>({
    ...state,
    user_client : user_client,
    isLoadingUser_client: false
  })),
  on(UserActions.UpdateUserAsync_ClientFailure, (state) =>({
    ...state,
    isLoadingUser_client: false
  })),

  //change password client
  on(UserActions.ChangePassword_Client, (state) =>({
    ...state,
    isLoadingUser_client: true
  })),
  on(UserActions.ChangePassword_ClientSuccess, (state, {user_client}) =>({
    ...state,
    user_client : user_client,
    isLoadingUser_client: false
  })),
  on(UserActions.ChangePassword_ClientFailure, (state) =>({
    ...state,
    isLoadingUser_client: false
  })),
);


