import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CreateUserAsync_Admin } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-admin-add-user-form',
  templateUrl: './admin-add-user-form.component.html',
  styleUrls: ['./admin-add-user-form.component.css']
})
export class AdminAddUserFormComponent {

  UserForm! : FormGroup;
  imagePreview : string | ArrayBuffer | null = null;
  selectedFile : File | null = null;
  constructor(private store : Store, private router : Router){
    this.initForm();
  }
  ngOnInit(){
    
  }

  initForm(){
    this.UserForm = new FormGroup({
      firstName : new FormControl('',  Validators.required),
      lastName : new FormControl('', Validators.required),
      email : new FormControl('', [Validators.required, Validators.required]),
      phoneNum : new FormControl('',
         [Validators.required,Validators.pattern('^(0?)([3|5|7|8|9])[0-9]{8}$')]),
      address : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
      avatarUrl: new FormControl(''),
      avatarImage: new FormControl('')
    })
  }
  get firstName(){return this.UserForm.get('firstName')}
  get lastName(){return this.UserForm.get('lastName')}
  get email(){return this.UserForm.get('email')}
  get phoneNum(){return this.UserForm.get('phoneNum')}
  get address(){return this.UserForm.get('address')}
  get password(){return this.UserForm.get('password')}
  get avatarImage() {return this.UserForm.get('avatarImage')}

  onFileSelected(event : any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }
  previewImage(){
    if(this.selectedFile){
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      }
      reader.readAsDataURL(this.selectedFile);
    }
  }
  submitForm(){
    if(this.UserForm.valid){
      const userSend: FormData = new FormData();
      userSend.append('firstName', this.firstName?.value.trim());
      userSend.append('lastName', this.lastName?.value.trim());
      userSend.append('email', this.email?.value.trim());
      userSend.append('password', this.password?.value.trim()); 
      userSend.append('phoneNum', this.phoneNum?.value.trim());
      userSend.append('address', this.address?.value.trim());
      if (this.selectedFile) {
        userSend.append('avatarImage', this.selectedFile, this.selectedFile.name);
      }
      //
      this.store.dispatch(CreateUserAsync_Admin({user_item : userSend}))
      this.UserForm.reset();
      this.router.navigate(['admin/userManagement']);
    }
  }
}
