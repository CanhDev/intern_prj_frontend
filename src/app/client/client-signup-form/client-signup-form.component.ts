import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createpasswordMatchValidator } from './checkMatchPass';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoadingSingUp } from 'src/app/store/selectors/account.selectors';
import { SignUp } from 'src/app/store/actions/account.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-signup-form',
  templateUrl: './client-signup-form.component.html',
  styleUrls: ['./client-signup-form.component.css']
})
export class ClientSignupFormComponent {

  SignupForm! : FormGroup;
  isLoadingSingUp$ : Observable<boolean>;

  constructor(private store : Store, private toastr : ToastrService){
    this.isLoadingSingUp$ = this.store.select(isLoadingSingUp);
  }

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.SignupForm = new FormGroup({
      fname: new FormControl('', Validators.required),
      lname : new FormControl('', Validators.required),
      email : new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword : new FormControl('', [Validators.required, createpasswordMatchValidator()])
    });
  }
  get fname(){return this.SignupForm.get('fname')}
  get lname(){return this.SignupForm.get('lname')}
  get email(){return this.SignupForm.get('email')}
  get password(){return this.SignupForm.get('password')}
  get confirmPassword(){return this.SignupForm.get('confirmPassword')}

  submitForm(){
    if(this.SignupForm.valid){
      const data = this.SignupForm.value;
      this.store.dispatch(SignUp({signUpModel: data}));
    }
    else{
      this.toastr.error("Form không hợp lệ", "Thông báo");
    }
    this.SignupForm.reset();
  }
}
