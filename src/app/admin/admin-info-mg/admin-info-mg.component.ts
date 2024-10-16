import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ChangePassword_Client, GetUserAsync_Client, UpdateUserAsync_Client } from 'src/app/store/actions/user.actions';
import { selectUser_client } from 'src/app/store/selectors/user.selectors';
import { UserGet } from 'src/shared/data-get/UserGet';
import { changePasswordSend } from 'src/shared/data-send/changepasswordsend';
import { createpasswordMatchValidatorv3 } from './checkMatchPassv3';

@Component({
  selector: 'app-admin-info-mg',
  templateUrl: './admin-info-mg.component.html',
  styleUrls: ['./admin-info-mg.component.css']
})
export class AdminInfoMgComponent {
  user$: Observable<UserGet | null>;
  userForm!: FormGroup;
  PasswordForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  user!: UserGet;
  selectedFile: File | null = null;

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUser_client);
  }

  ngOnInit() {
    this.store.dispatch(GetUserAsync_Client());
    this.initUserForm();
    this.initPasswordForm();
    
    this.user$.pipe(
      map((res: UserGet | null) => {
        if (res) {
          this.user = res;
          this.initUserFormWithUserData();
        }
      })
    ).subscribe();
  }

  initUserForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNum : new FormControl('',  [Validators.required, Validators.pattern('^(0?)([3|5|7|8|9])[0-9]{8}$')]),
      address : new FormControl('', Validators.required),
      avatarImage: new FormControl(null)
    });
  }

  initUserFormWithUserData() {
    if (this.user) {
      this.userForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        phoneNum : this.user.phoneNum,
        address : this.user.address,
        avatarUrl: this.user.avatarUrl // Thêm avatarUrl nếu cần
      });
    }
  }

  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get email() { return this.userForm.get('email'); }
  get avatarImage() { return this.userForm.get('avatarImage'); }
  get phoneNum(){return this.userForm.get('phoneNum')}
  get address(){return this.userForm.get('address')}

  submitUserForm() {
    if (this.userForm.valid) {
      const userSend: FormData = new FormData();
      userSend.append('firstName', this.firstName?.value.trim());
      userSend.append('lastName', this.lastName?.value.trim());
      userSend.append('email', this.email?.value.trim());
      userSend.append('password', "123"); 
      userSend.append('avatarUrl', this.user.avatarUrl); 
      userSend.append('phoneNum', this.phoneNum?.value.trim());
      userSend.append('address', this.address?.value.trim());
      if (this.selectedFile) {
        userSend.append('avatarImage', this.selectedFile, this.selectedFile.name);
      }

      this.store.dispatch(UpdateUserAsync_Client({ user_client: userSend }));
      this.imagePreview = null;
    }
  }

  submitPasswordForm() {
    if (this.PasswordForm.valid) {
      const payload : changePasswordSend = {
        oldPassword: this.oldPassword?.value.trim(),
        newPassword: this.newPassword?.value.trim()
      };
  
      this.store.dispatch(ChangePassword_Client({changePasswordSend : payload}));
      this.PasswordForm.reset();
    }
  }
  
  
  
  initPasswordForm() {
    this.PasswordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword : new FormControl('', Validators.required),
      confirmPassword: new FormControl('', [Validators.required, createpasswordMatchValidatorv3()])
    });
  }

  get oldPassword(){return this.PasswordForm.get('oldPassword')}
  get newPassword(){return this.PasswordForm.get('newPassword')}
  get confirmPassword(){return this.PasswordForm.get('confirmPassword')}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    this.previewImage();
  }

  previewImage(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
