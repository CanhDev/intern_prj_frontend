import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { getCart } from 'src/app/store/actions/cart.actions';
import { getCategories } from 'src/app/store/actions/category.actions';
import { AddItemCart } from 'src/app/store/actions/itemcart.actions';
import { loadProducts } from 'src/app/store/actions/product.actions';
import { selectCart } from 'src/app/store/selectors/cart.selectors';
import { selectCategories, selectIsLoadingCategories } from 'src/app/store/selectors/category.selectors';
import { selectIsloadingProducts, selectProducts, selectTotalProduct } from 'src/app/store/selectors/product.selectors';
import { CartGet } from 'src/shared/data-get/CartGet';
import { CategoryGet } from 'src/shared/data-get/CategoryGet';
import { ItemCartGet } from 'src/shared/data-get/ItemCartGet';
import { ProductGet } from 'src/shared/data-get/ProductGet';
import { ItemCartSend } from 'src/shared/data-send/ItemCartSend';

@Component({
  selector: 'app-client-shop',
  templateUrl: './client-shop.component.html',
  styleUrls: ['./client-shop.component.css']
})
export class ClientShopComponent {
  productList$: Observable<ProductGet[]>;
  categories$: Observable<CategoryGet[]>;
  isLoading$: Observable<boolean>;
  isLoadingCategories$: Observable<boolean>;
  //
  Cart$ : Observable<CartGet | null>;
  cartId : number = 0;
  @ViewChild('scrollToTop') scrollToTop!: ElementRef;

  activeFilter: string = 'all';
  filterString: string = '';
  typeId: number | null = null;
  sortString: string = 'date_desc';

  // Paging
  currentPage: number = 1;
  pageSize: number = 9; 
  totalPages: number = 0;
  totalProducts: number = 0; 
  pages: number[] = [];

  constructor(private store: Store, private toastr: ToastrService) {
    this.productList$ = this.store.select(selectProducts);
    this.categories$ = this.store.select(selectCategories);
    this.isLoading$ = this.store.select(selectIsloadingProducts);
    this.isLoadingCategories$ = this.store.select(selectIsLoadingCategories);
    this.Cart$ = this.store.select(selectCart);
  }

  ngOnInit() {
    this.initPage();
    this.store.dispatch(getCart());
  }

  initPage() {
    this.loadProducts();
    this.store.dispatch(getCategories());
    this.Cart$.pipe(
      map((cartItem : any)=>{
        if(cartItem){
          this.cartId = cartItem.id;
          console.log(this.cartId);
        }
      })
    ).subscribe()
  }

  loadProducts() {
    this.store.dispatch(loadProducts({ pageNumber: this.currentPage, pageSize: this.pageSize,
       typeId: this.typeId, filterString: this.filterString, sortString: this.sortString }));
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
              this.totalPages = Math.ceil(this.totalProducts / this.pageSize); // Tính tổng số trang
              this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Tạo mảng số trang
          });
        }
      })
    ).subscribe();
  }

  onFilterClick(filter: string, CategoryId: number | null, event: MouseEvent): void {
    event.preventDefault();
    this.typeId = CategoryId;
    this.activeFilter = filter;
    this.currentPage = 1; 
    this.loadProducts();
  }

  filterByType(categoryId: number) {
    this.currentPage = 1; 
    this.loadProducts();
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortString = selectElement.value;
    this.currentPage = 1; 
    this.loadProducts();
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
  addItemCart(productId: number, cartId: number, quantity: number, price: number) {
    const item: ItemCartSend = {
      productId: productId,
      cartId: cartId,
      quantity: quantity,
      price: price,
    };
    this.store.dispatch(AddItemCart({ item }));  
  }
  
}
