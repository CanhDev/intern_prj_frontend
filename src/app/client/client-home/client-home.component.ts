import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { getCategories } from 'src/app/store/actions/category.actions';
import { loadProducts } from 'src/app/store/actions/product.actions';
import { selectCategories, selectIsLoadingCategories } from 'src/app/store/selectors/category.selectors';
import { selectIsloadingProducts, selectProducts } from 'src/app/store/selectors/product.selectors';
import { CategoryGet } from 'src/shared/data-get/CategoryGet';
import { ProductGet } from 'src/shared/data-get/ProductGet';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent {
  productList$ : Observable<ProductGet[]>;
  categories$ : Observable<CategoryGet[]>;
  isLoading$ : Observable<boolean>;
  isLoadingCategories$ : Observable<boolean>;

  constructor(private store : Store, private Toastr : ToastrService){
    this.productList$ = this.store.select(selectProducts);
    this.categories$ = this.store.select(selectCategories);
    this.isLoading$ = this.store.select(selectIsloadingProducts);
    this.isLoadingCategories$ = this.store.select(selectIsLoadingCategories);
  }
  ngOnInit(){
    this.store.dispatch(loadProducts({pageNumber : 1, pageSize : 6}));
    this.store.dispatch(getCategories())
  }
}
