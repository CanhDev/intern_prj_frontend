import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeleteUserAsync_Admin, GetUsers_Admin } from 'src/app/store/actions/user.actions';
import { selectisLoadingUser_item, selectisLoadingUserList, selectUserList } from 'src/app/store/selectors/user.selectors';
import { UserGet } from 'src/shared/data-get/UserGet';

@Component({
  selector: 'app-admin-user-mg',
  templateUrl: './admin-user-mg.component.html',
  styleUrls: ['./admin-user-mg.component.css']
})
export class AdminUserMgComponent {

  Users$ : Observable<UserGet[]>;
  isLoadingUsers$ : Observable<boolean>; // list user
  isLoadingUser_item$ : Observable<boolean>; //user item

  constructor(private store : Store, private router : Router){
    this.Users$ = this.store.select(selectUserList);
    this.isLoadingUsers$ = this.store.select(selectisLoadingUserList);
    this.isLoadingUser_item$ = this.store.select(selectisLoadingUser_item);
  }

  ngOnInit(){
    this.store.dispatch(GetUsers_Admin());
  }
  moveToAddForm(){
    this.router.navigate(['/admin/addUserForm']);
  }
  moveToEditform(id : string){
    this.router.navigate(['/admin/editUserForm', id]);
  }
  handleRemove(id : string){
    var confirm = window.confirm("Bạn có chắc chắn xóa người dùng này?");
    if(confirm) {
      this.store.dispatch(DeleteUserAsync_Admin({userId : id}));
    }
  }
}
