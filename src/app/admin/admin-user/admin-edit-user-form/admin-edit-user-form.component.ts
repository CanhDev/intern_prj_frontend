import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { GetUser_Admin, UpdateUserAsync_Admin } from 'src/app/store/actions/user.actions';
import { selectUserItem } from 'src/app/store/selectors/user.selectors';
import { UserGet } from 'src/shared/data-get/UserGet';

@Component({
  selector: 'app-admin-edit-user-form',
  templateUrl: './admin-edit-user-form.component.html',
  styleUrls: ['./admin-edit-user-form.component.css']
})
export class AdminEditUserFormComponent {
  user$: Observable<UserGet | null>;
  userForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  user!: UserGet;
  selectedFile: File | null = null;

  constructor(private store: Store, private route : ActivatedRoute, private router : Router) {
    this.user$ = this.store.select(selectUserItem);
  }

  ngOnInit() {
    this.initUserForm();

    this.route.paramMap.subscribe((params : ParamMap)=>{
      let id =  params.get('id');
      if(id){
        this.store.dispatch(GetUser_Admin({userId : id}));
      }
    });

    this.user$.pipe(
      map((res: UserGet | null) => {
        if (res) {
          this.user = res;
          this.initUserFormWithUserData();
          this.imagePreview = this.user.avatarUrl;
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
      avatarUrl : new FormControl(''),
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
        avatarUrl: this.user.avatarUrl 
      });
    }
  }

  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get email() { return this.userForm.get('email'); }
  get avatarImage() { return this.userForm.get('avatarImage'); }
  get phoneNum(){return this.userForm.get('phoneNum')}
  get address(){return this.userForm.get('address')}

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
  submitForm() {
    if (this.userForm.valid) {
      let userSend = new FormData();
      const userData = this.userForm.value;
      Object.keys(userData).forEach((key)=>{
        if(key !==  'avatarImage'){
          userSend.append(key, userData[key]);
        }
      })
      if (this.selectedFile) {
        userSend.append('avatarImage', this.selectedFile, this.selectedFile.name);
      }
      this.logFormData(userSend);
      this.store.dispatch(UpdateUserAsync_Admin({user_item : userSend, userId : this.user.id}))
      this.imagePreview = null;
      this.router.navigate(['/admin/userManagement']);
    }
  }
  private logFormData(formData: FormData): void {
    formData.forEach((value, key) => {
      console.log(key, value);
    });
  }
}
