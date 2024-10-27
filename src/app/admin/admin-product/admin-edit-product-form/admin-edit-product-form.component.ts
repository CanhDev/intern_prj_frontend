import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCategories } from 'src/app/store/actions/category.actions';
import { addProduct, editProduct, getSingleProduct } from 'src/app/store/actions/product.actions';
import { selectCategories } from 'src/app/store/selectors/category.selectors';
import { selectIsloadingProduct, selectProduct } from 'src/app/store/selectors/product.selectors';
import { CategoryGet } from 'src/shared/data-get/CategoryGet';
import { ImageGet } from 'src/shared/data-get/ImageGet';
import { ProductGet } from 'src/shared/data-get/ProductGet';
import { ImageSend } from 'src/shared/data-send/ImageSend';

@Component({
  selector: 'app-admin-edit-product-form',
  templateUrl: './admin-edit-product-form.component.html',
  styleUrls: ['./admin-edit-product-form.component.css']
})
export class AdminEditProductFormComponent {
  productForm!: FormGroup;
  Categories$: Observable<CategoryGet[] | null>;
  imagePreviews: string[] = [];
  oldImage: string[] = [];
  product$!: Observable<ProductGet | null>;
  product!: ProductGet;
  isLoadingProduct$ : Observable<boolean>;

  constructor(
    private fb: FormBuilder, 
    private store: Store, 
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.Categories$ = this.store.select(selectCategories);
    this.product$ = this.store.select(selectProduct);
    this.isLoadingProduct$ = this.store.select(selectIsloadingProduct);
  }

  ngOnInit(): void {
    this.store.dispatch(getCategories());
    this.initForm();
    this.loadProduct();
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      originalPrice: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      outOfStockstatus : [false, Validators.required],
      categoryId: ['', Validators.required],
      size: [''],
      imgs: this.fb.array([])
    });
  }

  private initFormWithProductData(): void {
    this.productForm.patchValue({
      name: this.product.name,
      description: this.product.description,
      quantity: this.product.quantity,
      originalPrice: this.product.originalPrice,
      price: this.product.price,
      outOfStockstatus: this.product.outOfStockstatus,
      categoryId: this.product.categoryId,
      size: this.product.size,
    });
  }

  get imgs(): FormArray {
    return this.productForm.get('imgs') as FormArray;
  }

  private loadProduct(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(getSingleProduct({ id: parseInt(id, 10) }));
      }
    });

    this.product$.subscribe(product => {
      if (product && product.images.length > 0) {
        this.product = product;
        this.imagePreviews = product.images.map((item: ImageGet) => item.imageUrl);
        this.oldImage = [...this.imagePreviews];
        this.initFormWithProductData();
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      Array.from(input.files).forEach(file => {
        this.imgs.push(new FormControl(file));
        this.previewImage(file);
      });

      console.log('Selected files:', input.files);
      console.log('FormArray imgs:', this.imgs.value);
    }
  }

  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreviews.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  removeImage(index: number, imgUrl: string): void {
    console.log('Removing image:', imgUrl);
    this.imgs.removeAt(index); // Xóa file từ FormArray
    this.imagePreviews.splice(index, 1); // Xóa preview hình ảnh
    this.oldImage = this.oldImage.filter((item) => item !== imgUrl);
    console.log('Updated oldImage:', this.oldImage);
}


  submitForm(): void {
    if (this.productForm.valid) {
      const formData = this.createFormData();
      this.logFormData(formData);
      this.store.dispatch(editProduct({product : formData, id : this.product.id}))
      this.router.navigate(['admin/productManagement'])
    } else {
      console.error('Form is invalid', this.productForm.errors);
    }
  }

  private createFormData(): FormData {
    const formData = new FormData();
    const productData = this.productForm.value;

    Object.keys(productData).forEach(key => {
      if (key !== 'imgs' && key !== 'images') {
        formData.append(key, productData[key]);
      }
    });

    this.imgs.controls.forEach((control: AbstractControl) => {
      const file = control.value as File;
      if (file) {
        formData.append('imgs', file, file.name);
      }
    });

    if (this.oldImage.length > 0) {
        this.oldImage.forEach(item => {
          formData.append('ImageUrls', item);
        });
      }

    return formData;
  }

  private logFormData(formData: FormData): void {
    formData.forEach((value, key) => {
      console.log(key, value);
    });
  }
}
