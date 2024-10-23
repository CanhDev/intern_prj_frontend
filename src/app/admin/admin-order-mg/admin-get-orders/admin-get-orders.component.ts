import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { DeleteOrder, getAllOrders } from 'src/app/store/actions/order.actions';
import { selectAllOrders, selectIsloadingAllOrders, selectOrdersLength } from 'src/app/store/selectors/order.selectors';
import { OrderGet } from 'src/shared/data-get/OrderGet';

@Component({
  selector: 'app-admin-get-orders',
  templateUrl: './admin-get-orders.component.html',
  styleUrls: ['./admin-get-orders.component.css']
})
export class AdminGetOrdersComponent {

  @ViewChild('scrollToTop') scrollToTop!: ElementRef;

  ordersList$ : Observable<OrderGet[]>;
  isLoading$ : Observable<boolean>;
  //
  filterString : string = "";
  currentPage : number = 1;
  pageSize : number = 12;
  totalPages : number = 0;
  totalOrders : number = 0;
  pages : number[] = [];

  constructor(private store : Store, private router : Router){
    this.ordersList$ = this.store.select(selectAllOrders);
    this.isLoading$ = this.store.select(selectIsloadingAllOrders);
  }
  ngOnInit(){
    this.loadOrders();
  }

  loadOrders(){
    this.store.dispatch(getAllOrders
      ({filterString : this.filterString
        , pageNumber : this.currentPage
        , pageSize : this.pageSize}));
    if (this.scrollToTop) {
      this.scrollToTop.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
    this.ordersList$.pipe(
      map((orders : OrderGet[])=>{
        if(orders.length < 12 && this.currentPage == 1){
          this.totalPages = 1;
        }
        else{
          this.store.select(selectOrdersLength).subscribe(total =>{
            this.totalOrders = total;
            this.totalPages = Math.ceil(this.totalOrders / this.pageSize); 
            this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          })
        }
      })
    ).subscribe();
  }
  onSearch(){
    this.currentPage = 1;
    this.loadOrders();
  }
  nextPage(){
    if(this.currentPage < this.totalPages){
      this.currentPage++;
      this.loadOrders();
    }
  }
  previousPage(){
    if(this.currentPage > 1){
      this.currentPage --;
      this.loadOrders();
    }
  }
  goToPage(page : number){
    if(page > 0 && page <= this.totalPages){
      this.currentPage = page;
      this.loadOrders();
    }
  }
  moveToEditform(orderId : number){
    this.router.navigate(['admin/orderManagement',  orderId]);
  }
  handleRemove(orderId : number){
    var confirm = window.confirm("Bạn có chắc chắn muốn xóa hóa đơn này?");
    if(confirm){
      this.store.dispatch(DeleteOrder({id: orderId}));
    }
  }
}
