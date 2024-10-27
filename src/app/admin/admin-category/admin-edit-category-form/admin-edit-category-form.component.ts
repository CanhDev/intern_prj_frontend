import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { addCategory, editCategory, getCategory } from 'src/app/store/actions/category.actions';
import { selectCategory, selectIsLoadingCategory } from 'src/app/store/selectors/category.selectors';
import { CategoryGet } from 'src/shared/data-get/CategoryGet';

@Component({
  selector: 'app-admin-edit-category-form',
  templateUrl: './admin-edit-category-form.component.html',
  styleUrls: ['./admin-edit-category-form.component.css']
})
export class AdminEditCategoryFormComponent {
  Category$ : Observable<CategoryGet | null>;
  CategoryForm! : FormGroup;
  Category! : CategoryGet;
  imagePreview : string | ArrayBuffer| null = null;
  selectedFile : File | null = null;
  isLoadingCategory$ : Observable<boolean>;

  constructor(private store : Store, private route : ActivatedRoute, private router : Router){
    this.Category$ = this.store.select(selectCategory);
    this.isLoadingCategory$ = this.store.select(selectIsLoadingCategory);
  }
  ngOnInit(){
    this.route.paramMap.subscribe((params : ParamMap)=>{
      const id = params.get('id');
      if(id){
        this.store.dispatch(getCategory({id : parseInt(id, 10)}))
      }
    });
    this.initForm();
    this.Category$.pipe(
      map((item : CategoryGet | any)=>{
        if(item){
          this.Category = item;
          this.initFormWithData();
          this.imagePreview = this.Category.imageUrl;
        }
      })
    ).subscribe();
  }
  initForm(){
    this.CategoryForm = new FormGroup({
      name : new FormControl('', Validators.required),
      description : new FormControl('', Validators.required),
      imageUrl : new FormControl(''),
      image : new FormControl(null)
    });
  }
  initFormWithData(){
    this.CategoryForm.patchValue({
      name : this.Category.name,
      description : this.Category.description,
      imageUrl : this.Category.imageUrl,
    });
  }
  get name(){return this.CategoryForm.get('name')}
  get description(){return this.CategoryForm.get('description')}
  onFileSelected(event : any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }
  previewImage(){
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
      const CategoryData = this.CategoryForm.value;
      Object.keys(CategoryData).forEach(key =>{
        if(key !== 'image'){
          formData.append(key, CategoryData[key]);
        }
      });
      if(this.selectedFile){
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }
      this.store.dispatch(editCategory({ item : formData, id : this.Category.id}));
      this.router.navigate(['/admin/categoryManagement'])
    }
  }
}
