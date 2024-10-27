import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCategories } from 'src/app/store/actions/category.actions';
import { addProduct } from 'src/app/store/actions/product.actions';
import { selectCategories } from 'src/app/store/selectors/category.selectors';
import { selectIsloadingProduct } from 'src/app/store/selectors/product.selectors';
import { CategoryGet } from 'src/shared/data-get/CategoryGet';

@Component({
  selector: 'app-admin-add-product-form',
  templateUrl: './admin-add-product-form.component.html',
  styleUrls: ['./admin-add-product-form.component.css']
})
export class AdminAddProductFormComponent implements OnInit {
  productForm: FormGroup;
  Categories$: Observable<CategoryGet[] | null>;
  imagePreviews: string[] = [];
  isLoadingAdd$ : Observable<boolean>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.Categories$ = this.store.select(selectCategories);
    this.isLoadingAdd$ = this.store.select(selectIsloadingProduct)
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      originalPrice: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      size: [''],
      imgs: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.store.dispatch(getCategories());
  }

  get imgs(): FormArray {
    return this.productForm.get('imgs') as FormArray;
  }

  onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
          // Duyệt qua từng file được chọn
          Array.from(input.files).forEach(file => {
              this.imgs.push(new FormControl(file)); // Thêm file vào FormArray
              this.previewImage(file); // Xem trước hình ảnh
          });
      }
  }
  previewImage(file: File): void {
      const reader = new FileReader();
      reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result); // Thêm hình ảnh xem trước vào mảng
      };
      reader.readAsDataURL(file);
  }
  removeImage(index: number): void {
      this.imgs.removeAt(index); // Xóa hình ảnh khỏi FormArray
      this.imagePreviews.splice(index, 1); // Xóa hình ảnh khỏi mảng xem trước
  }


  submitForm(): void {
    if (this.productForm.valid) {
        const formData = new FormData();
        const productData = this.productForm.value;
        Object.keys(productData).forEach(key => {
            if (key !== 'imgs') {
                formData.append(key, productData[key]);
            }
        });
        this.imgs.controls.forEach((control: AbstractControl) => {
            const file = control.value as File;
            if (file) {
                formData.append('imgs', file, file.name);
            }
        });
        this.store.dispatch(addProduct({ product: formData }));
        this.productForm.reset();
        this.imagePreviews.splice(0);
    } else {
        console.error('Form is invalid', this.productForm.errors);
    }
}
}