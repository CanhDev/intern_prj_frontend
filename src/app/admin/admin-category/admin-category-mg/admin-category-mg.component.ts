import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Observer } from 'rxjs';
import { deleteCategory, getCategories } from 'src/app/store/actions/category.actions';
import { selectCategories, selectIsLoadingCategories, selectIsLoadingCategory } from 'src/app/store/selectors/category.selectors';
import { CategoryGet } from 'src/shared/data-get/CategoryGet';

@Component({
  selector: 'app-admin-category-mg',
  templateUrl: './admin-category-mg.component.html',
  styleUrls: ['./admin-category-mg.component.css']
})
export class AdminCategoryMgComponent {

  Categories$ : Observable<CategoryGet[]>
  isloading$ : Observable<boolean>;
  isLoadingCategory$ : Observable<boolean>;
  
  constructor(private store : Store, private router : Router){
    this.Categories$ = this.store.select(selectCategories);
    this.isloading$ = this.store.select(selectIsLoadingCategories)
    this.isLoadingCategory$ = this.store.select(selectIsLoadingCategory);
  }

  ngOnInit(){
    this.store.dispatch(getCategories());
  }

  moveToAddForm(){
    this.router.navigate(['admin/addCategoryForm']);
  }
  moveToEditform(id: number){
    this.router.navigate(['admin/editCategoryForm', id ]);
  }
  handleRemove(id : number){
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa danh mục này ?");
    if(confirm){
      this.store.dispatch(deleteCategory({id}));
    }
  }
}
