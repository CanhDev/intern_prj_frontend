import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, takeUntil, Subject, filter } from 'rxjs';
import * as CartActions from 'src/app/store/actions/cart.actions';
import * as CategoryActions from 'src/app/store/actions/category.actions';
import * as ItemCartActions from 'src/app/store/actions/itemcart.actions';
import * as ProductActions from 'src/app/store/actions/product.actions';
import * as fromCart from 'src/app/store/selectors/cart.selectors';
import * as fromCategory from 'src/app/store/selectors/category.selectors';
import * as fromItemCart from 'src/app/store/selectors/itemcart.selectors';
import * as fromProduct from 'src/app/store/selectors/product.selectors';
import { ProductGet } from 'src/shared/data-get/ProductGet';
import { ItemCartSend } from 'src/shared/data-send/ItemCartSend';

interface ProductFilters {
  pageNumber: number;
  pageSize: number;
  typeId: number | null;
  filterString: string;
  sortString: string;
}

@Component({
  selector: 'app-client-shop',
  templateUrl: './client-shop.component.html',
  styleUrls: ['./client-shop.component.css']
})
export class ClientShopComponent implements OnInit {
  private destroy$ = new Subject<void>();
  
  // Observables
  readonly productList$ = this.store.select(fromProduct.selectProducts);
  readonly categories$ = this.store.select(fromCategory.selectCategories);
  readonly category$ = this.store.select(fromCategory.selectCategory);
  readonly isLoading$ = this.store.select(fromProduct.selectIsloadingProducts);
  readonly isLoadingCategories$ = this.store.select(fromCategory.selectIsLoadingCategories);
  readonly isLoadingUpdate$ = this.store.select(fromItemCart.selectisLoadingUpdate);
  readonly cart$ = this.store.select(fromCart.selectCart);

  isAuthen : boolean = false;

  // Component state
  filterProduct: ProductGet[] = [];
  cartId = 0;
  activeFilter = 'all';
  
  // Filtering state
  filters: ProductFilters = {
    pageNumber: 1,
    pageSize: 12,
    typeId: null,
    filterString: '',
    sortString: 'date_desc'
  };

  // Pagination state
  totalPages = 0;
  totalProducts = 0;
  pages: number[] = [];

  @ViewChild('scrollToTop') scrollToTop!: ElementRef;

  constructor(
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    this.initializeStore();
    this.setupCartSubscription();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeStore(): void {
    
    this.store.dispatch(CartActions.getCart());
    this.store.dispatch(CategoryActions.getCategories());
    this.loadProducts();
  }

  private setupCartSubscription(): void {
    this.cart$.pipe(
      takeUntil(this.destroy$),
      filter(cart => !!cart)
    ).subscribe(cart => {
      this.cartId = cart!.id;
    });
  }

  loadProducts(): void {
    this.category$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(category => {
      if (category) {
        this.store.dispatch(ProductActions.loadProducts({ typeId: category.id }));
        this.activeFilter = category.name;
        this.filters.typeId = category.id;
        this.store.dispatch(CategoryActions.getCategoryFailure({ error: "", statusCode: 0 }));
      } else {
        this.store.dispatch(ProductActions.loadProducts(this.filters));
      }
    });
      this.updateProductList();
    this.scrollToTopOfPage();
  }

  private updateProductList(): void {
    this.productList$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(products => {
      this.filterProduct = products.filter(item => !item.outOfStockstatus);
      this.updatePagination(products.length);
    });
  }

  private updatePagination(productsLength: number): void {
    if (productsLength < this.filters.pageSize && this.filters.pageNumber === 1) {
      this.totalPages = 1;
    } else {
      this.store.select(fromProduct.selectTotalProduct).pipe(
        takeUntil(this.destroy$)
      ).subscribe(total => {
        this.totalProducts = total;
        this.totalPages = Math.ceil(this.totalProducts / this.filters.pageSize);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      });
    }
  }

  private scrollToTopOfPage(): void {
    if (this.scrollToTop) {
      this.scrollToTop.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Event Handlers
  onFilterClick(filter: string, categoryId: number | null, event: Event): void {
    event.preventDefault();
    this.filters = {
      ...this.filters,
      pageNumber: 1,
      typeId: categoryId
    };
    this.activeFilter = filter;
    this.loadProducts();
  }

  onSortChange(event: Event): void {
    this.filters = {
      ...this.filters,
      pageNumber: 1,
      sortString: (event.target as HTMLSelectElement).value
    };
    this.loadProducts();
  }

  onSearch(): void {
    this.filters = {
      ...this.filters,
      pageNumber: 1
    };
    this.loadProducts();
  }

  // Pagination Methods
  nextPage(): void {
    if (this.filters.pageNumber < this.totalPages) {
      this.filters = {
        ...this.filters,
        pageNumber: this.filters.pageNumber + 1
      };
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.filters.pageNumber > 1) {
      this.filters = {
        ...this.filters,
        pageNumber: this.filters.pageNumber - 1
      };
      this.loadProducts();
    }
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.filters = {
        ...this.filters,
        pageNumber: page
      };
      this.loadProducts();
    }
  }

  addItemCart(productId: number, cartId: number, quantity: number, price: number): void {
    const item: ItemCartSend = { productId, cartId, quantity, price };
    this.store.dispatch(ItemCartActions.AddItemCart({ item }));
  }
}