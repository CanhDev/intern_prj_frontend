import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserGet } from 'src/shared/data-get/UserGet';
import { changePasswordSend } from 'src/shared/data-send/changepasswordsend';
import { UserSend } from 'src/shared/data-send/UserSend';


//admin field
//get GetUsers_Admin list

export const GetUsers_Admin =
 createAction('[User/API] GetUsers_Admin');

 export const GetUsers_AdminSuccess =
 createAction('[User/API] GetUsers_AdminSuccess', 
  props<{userList : UserGet[]}>()
 );

 export const GetUsers_AdminFailure =
 createAction('[User/API] GetUsers_AdminFailure', 
  props<{error : string, statusCode : number}>()
 );

 //get GetUser_Admin item

export const GetUser_Admin =
 createAction('[User/API] GetUser_Admin',
  props<{userId : string}>()
 );

 export const GetUser_AdminSuccess =
 createAction('[User/API] GetUser_AdminSuccess', 
  props<{user_item : UserGet}>()
 );

 export const GetUser_AdminFailure =
 createAction('[User/API] GetUser_AdminFailure', 
  props<{error : string, statusCode : number}>()
 );

 //CreateUserAsync_Admin operation

export const CreateUserAsync_Admin =
createAction('[User/API] CreateUserAsync_Admin',
 props<{user_item : FormData}>()
);

export const CreateUserAsync_AdminSuccess =
createAction('[User/API] CreateUserAsync_AdminSuccess', 
 props<{user_item : UserGet}>()
);

export const CreateUserAsync_AdminFailure =
createAction('[User/API] CreateUserAsync_AdminFailure', 
 props<{error : string, statusCode : number}>()
);

//UpdateUserAsync_Admin operation

export const UpdateUserAsync_Admin =
createAction('[User/API] UpdateUserAsync_Admin',
 props<{user_item : FormData, userId : string}>()
);

export const UpdateUserAsync_AdminSuccess =
createAction('[User/API] UpdateUserAsync_AdminSuccess', 
 props<{user_item : UserGet}>()
);

export const UpdateUserAsync_AdminFailure =
createAction('[User/API] UpdateUserAsync_AdminFailure', 
 props<{error : string, statusCode : number}>()
);

//DeleteUserAsync_Admin operation

export const DeleteUserAsync_Admin =
createAction('[User/API] DeleteUserAsync_Admin',
 props<{userId : string}>()
);

export const DeleteUserAsync_AdminSuccess =
createAction('[User/API] DeleteUserAsync_AdminSuccess', 
 props<{userId : string}>()
);

export const DeleteUserAsync_AdminFailure =
createAction('[User/API] DeleteUserAsync_AdminFailure', 
 props<{error : string, statusCode : number}>()
);

////client field
//GetUserAsync_Client operation
export const ClearUser_client =
 createAction('[User/API] ClearUser_client');
 
export const GetUserAsync_Client =
createAction('[User/API] GetUserAsync_Client');

export const GetUserAsync_ClientSuccess =
createAction('[User/API] GetUserAsync_ClientSuccess', 
 props<{user_client : UserGet}>()
);

export const GetUserAsync_ClientFailure =
createAction('[User/API] GetUserAsync_ClientFailure', 
 props<{error : string, statusCode : number}>()
);

//UpdateUserAsync_Client operation

export const UpdateUserAsync_Client =
createAction('[User/API] UpdateUserAsync_Client',
  props<{user_client : FormData}>()
);

export const UpdateUserAsync_ClientSuccess =
createAction('[User/API] UpdateUserAsync_ClientSuccess', 
 props<{user_client : UserGet}>()
);

export const UpdateUserAsync_ClientFailure =
createAction('[User/API] UpdateUserAsync_ClientFailure', 
 props<{error : string, statusCode : number}>()
);

//ChangePassword_Client operation

export const ChangePassword_Client =
createAction('[User/API] ChangePassword_Client',
  props<{changePasswordSend : changePasswordSend}>()
);

export const ChangePassword_ClientSuccess =
createAction('[User/API] ChangePassword_ClientSuccess', 
 props<{user_client : UserGet}>()
);

export const ChangePassword_ClientFailure =
createAction('[User/API] ChangePassword_ClientFailure', 
 props<{error : string, statusCode : number}>()
);