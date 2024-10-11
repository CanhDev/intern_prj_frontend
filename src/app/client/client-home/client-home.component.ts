import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { loadProducts } from 'src/app/store/actions/product.actions';
import { selectIsloadingProducts, selectProducts } from 'src/app/store/selectors/product.selectors';
import { ProductGet } from 'src/shared/data-get/ProductGet';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent {
  productList$ : Observable<ProductGet[]>;
  isLoading$ : Observable<boolean>;

  constructor(private store : Store, private Toastr : ToastrService){
    this.productList$ = this.store.select(selectProducts);
    this.isLoading$ = this.store.select(selectIsloadingProducts);
  }

  ngOnInit(){
    this.store.dispatch(loadProducts({pageNumber : 1, pageSize : 6}));
  }
}
