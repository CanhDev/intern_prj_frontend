import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { deleteProduct, loadProducts } from 'src/app/store/actions/product.actions';
import { selectIsloadingProducts, selectProducts, selectTotalProduct } from 'src/app/store/selectors/product.selectors';
import { ProductGet } from 'src/shared/data-get/ProductGet';

@Component({
  selector: 'app-admin-product-mg',
  templateUrl: './admin-product-mg.component.html',
  styleUrls: ['./admin-product-mg.component.css']
})
export class AdminProductMgComponent {
  @ViewChild('scrollToTop') scrollToTop!: ElementRef;

  productList$ : Observable<ProductGet[]>
  isLoadingProductList$ : Observable<boolean>;

  //
  filterString: string = "";
  currentPage: number = 1;
  pageSize: number = 9; 
  totalPages: number = 0;
  totalProducts: number = 0; 
  pages: number[] = [];

  constructor(private store : Store, private router : Router){
    this.productList$ = this.store.select(selectProducts);
    this.isLoadingProductList$ = this.store.select(selectIsloadingProducts);
  }
  ngOnInit(){
    this.loadProducts();
  }
  loadProducts() {
    this.store.dispatch(loadProducts({ filterString: this.filterString, pageNumber: this.currentPage, pageSize: this.pageSize }));
       if (this.scrollToTop) {
        this.scrollToTop.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
      
    this.productList$.pipe(
      map((products : ProductGet[])=>{
        if(products.length < 9 && this.currentPage == 1){
          this.totalPages = 1;
        }
        else{
            this.store.select(selectTotalProduct).subscribe(total => {
              this.totalProducts = total;
              this.totalPages = Math.ceil(this.totalProducts / this.pageSize); 
              this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Tạo mảng số trang
          });
        }
      })
    ).subscribe();
  }
  onSearch(): void {
    this.currentPage = 1; 
    this.loadProducts();
  }
    nextPage(): void {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.loadProducts();
      }
    }
  
    previousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadProducts();
      }
    }
  
    goToPage(page: number): void {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
        this.loadProducts();
      }
    }
    //
    moveToAddForm(){
      this.router.navigate(['admin/addProductForm'])
    }
    moveToEditForm(id : number){
      this.router.navigate(['admin/editProductForm', id])
    }
    handleRemove(id : number){
      const confirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
      if(confirm){
        this.store.dispatch(deleteProduct({id}));
      }
    }
}
