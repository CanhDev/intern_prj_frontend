import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { Login } from 'src/app/store/actions/account.actions';
import { GetUserAsync_Client } from 'src/app/store/actions/user.actions';
import { isLoadingLogin } from 'src/app/store/selectors/account.selectors';
import { selectUser_client } from 'src/app/store/selectors/user.selectors';
import { UserGet } from 'src/shared/data-get/UserGet';
import { AccountService } from 'src/shared/services/account/account.service';

@Component({
  selector: 'app-client-login-form',
  templateUrl: './client-login-form.component.html',
  styleUrls: ['./client-login-form.component.css']
})
export class ClientLoginFormComponent {

  LoginForm! : FormGroup;
  isLoadingLogin$ : Observable<boolean>;
  isAuthenticated$ : Observable<boolean>;
  user$ : Observable<UserGet | null>
  constructor(private store : Store, private toastr : ToastrService, private accountService : AccountService,
    private router : Router
  ){
    this.isLoadingLogin$ = this.store.select(isLoadingLogin);
    this.isAuthenticated$ = this.accountService.isAuthenticated();
    this.user$ = this.store.select(selectUser_client);
  }
  ngOnInit(){
    this.initForm();
    this.checkIsAuthen();
  }
  checkIsAuthen(){
    this.isAuthenticated$.pipe(
      map((res : boolean) => {
        if(res) {
          this.router.navigate(['']);
        }
      })
    ).subscribe();
  }
  initForm(){
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', Validators.required)
    });
  }
  get email(){return this.LoginForm.get('email')}
  get password(){return this.LoginForm.get('password')}

  submitForm(){
    if(this.LoginForm.valid){
      const data = this.LoginForm.value;
      this.store.dispatch(Login({loginModel : data}));
    }
    else{
      this.toastr.error("Form không hợp lệ", "Thông báo");
    }
  }
}
