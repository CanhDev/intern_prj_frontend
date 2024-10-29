import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { getCategories, getCategoriesFailure, getCategory } from 'src/app/store/actions/category.actions';
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
  //
  filterProduct : ProductGet[] = [];

  constructor(private store : Store, private Toastr : ToastrService, private router : Router){
    this.productList$ = this.store.select(selectProducts);
    this.categories$ = this.store.select(selectCategories);
    this.isLoading$ = this.store.select(selectIsloadingProducts);
    this.isLoadingCategories$ = this.store.select(selectIsLoadingCategories);
  }
  ngOnInit(){
    this.store.dispatch(loadProducts({pageNumber : 1, pageSize : 9}));
    this.store.dispatch(getCategories());
    this.productList$.pipe(
      map((products : ProductGet[])=>{
        const availableProducts = products.filter(item => !item.outOfStockstatus);
        this.filterProduct = availableProducts.slice(0,6);
      })
    ).subscribe();
  }
  handleGetProductByType(id : number){
    this.router.navigate(['shop']);
    this.store.dispatch(getCategory({id : id}));
  }
}
