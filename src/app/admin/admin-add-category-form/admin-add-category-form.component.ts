import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addCategory } from 'src/app/store/actions/category.actions';
import { reducer } from 'src/app/store/reducers/user.reducer';

@Component({
  selector: 'app-admin-add-category-form',
  templateUrl: './admin-add-category-form.component.html',
  styleUrls: ['./admin-add-category-form.component.css']
})
export class AdminAddCategoryFormComponent {
  CategoryForm! : FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private fb : FormBuilder, private store : Store){
    
  }
  ngOnInit(){
    this.initForm();
  } 
  initForm(){
    this.CategoryForm = this.fb.group({
      name : ['', Validators.required],
      description : ['', Validators.required],
      image : [null, Validators.required]
    })
  }
  get name(){return this.CategoryForm.get('name')}
  get description(){return this.CategoryForm.get('description')}

  onFileSelected(event : any):void{
    this.selectedFile = event.target.files[0] as File;
    this.previewImage();
  }
  previewImage() :void{
    if(this.selectedFile){
      const reader = new FileReader();
      reader.onload = () =>{
        this.imagePreview = reader.result;
      }
      reader.readAsDataURL(this.selectedFile);
    }
  }
  submitForm(){
    if(this.CategoryForm.valid){
      const formData = new FormData();
      const categoryData = this.CategoryForm.value;
      Object.keys(categoryData).forEach(key =>{
        if(key !== 'image'){
          formData.append(key, categoryData[key]);
        }
      });
      if(this.selectedFile){
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }
      this.store.dispatch(addCategory({item : formData}));
      this.imagePreview = null;
    }
    this.CategoryForm.reset();
  }
}
