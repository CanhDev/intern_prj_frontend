import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetUsers_Admin } from 'src/app/store/actions/user.actions';
import { selectisLoadingUserList, selectUserList } from 'src/app/store/selectors/user.selectors';
import { UserGet } from 'src/shared/data-get/UserGet';

@Component({
  selector: 'app-admin-user-mg',
  templateUrl: './admin-user-mg.component.html',
  styleUrls: ['./admin-user-mg.component.css']
})
export class AdminUserMgComponent {

  Users$ : Observable<UserGet[]>;
  isLoadingUsers$ : Observable<boolean>;

  constructor(private store : Store, private router : Router){
    this.Users$ = this.store.select(selectUserList);
    this.isLoadingUsers$ = this.store.select(selectisLoadingUserList);
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
  }
}
