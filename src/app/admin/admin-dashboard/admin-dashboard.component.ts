import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Chart, registerables } from 'chart.js';
import * as moment from 'moment';
import { map, Observable, tap } from 'rxjs';
import { GetStatistic, GetTopSelling } from 'src/app/store/actions/dashboard.actions';
import { selectisLoadingStatistics, selectisLoadingTopProducts, selectRevenueStatistics, selectTopProducts } from 'src/app/store/selectors/dashboard.selectors';
import { ProductGet } from 'src/shared/data-get/ProductGet';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  RevenueStatistics$ : Observable<any[]>;
  TopProducts$: Observable<ProductGet[] | null>;
  isLoadingStatistics$ : Observable<boolean>;
  isLoadingTopProducts$ : Observable<boolean>;
  //
  private chart: Chart | undefined;
  arrDate: string[] = []; 
  arrDoanhThu: number[] = []; 
  arrLoiNhuan: number[] = [];
  filterForm! : FormGroup;

  constructor(private store : Store) {
    Chart.register(...registerables);
    this.RevenueStatistics$ = this.store.select(selectRevenueStatistics);
    this.TopProducts$ = this.store.select(selectTopProducts);
    this.isLoadingStatistics$ = this.store.select(selectisLoadingStatistics);
    this.isLoadingTopProducts$ = this.store.select(selectisLoadingTopProducts);
  }

  ngOnInit(): void {
    this.store.dispatch(GetStatistic({}));
    this.store.dispatch(GetTopSelling({count : 5}))
    this.loadRevenueStatistics();
    this.initForm();
  }

  initForm(){
    this.filterForm = new FormGroup({
      startDate : new FormControl(''),
      endDate : new FormControl('')
    });
  }
  get startDate(){return this.filterForm.get('startDate')}
  get endDate(){return this.filterForm.get('endDate')}

  submitForm() {
    const startDateValue = this.startDate?.value; 
    const endDateValue = this.endDate?.value;     
  
    if (!startDateValue || !endDateValue) {
      console.error('Vui lòng chọn cả ngày bắt đầu và ngày kết thúc.');
      return; 
    }
  
    const formattedStartDate = startDateValue; 
    const formattedEndDate = endDateValue;
  
    const endDateWithExtraDay = moment(formattedEndDate).add(1, 'days').format('YYYY-MM-DD');
  
    this.store.dispatch(GetStatistic({
      startDate: formattedStartDate,
      endDate: endDateWithExtraDay
    }));
  }
  loadRevenueStatistics() {
    this.arrDate = [];
    this.arrDoanhThu = [];
    this.arrLoiNhuan = [];
    this.RevenueStatistics$.pipe(
      map((data: any) => {
        if (Array.isArray(data)) {
          data.forEach((item: any) => {
              let strDate = moment(item.date).format('DD/MM/YYYY'); 
              this.arrDate.push(strDate);
              this.arrDoanhThu.push(item.revenue);
              this.arrLoiNhuan.push(item.profit);
          });
          this.loadChart(); 
      } else {
          console.error('Dữ liệu không phải là mảng:', data);
      }
      }),
      tap(() => this.loadChart()) // Gọi loadChart sau khi dữ liệu đã được xử lý
    ).subscribe();
  }
ngOnDestroy() {
  if (this.chart) {
    this.chart.destroy();
  }
}
  loadChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }
    this.chart = new Chart('barChart', {
        type: 'bar',
        data: {
            labels: this.arrDate,
            datasets: [
                {
                    label: 'Doanh thu',
                    backgroundColor: 'rgba(60,141,188,0.9)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    data: this.arrDoanhThu
                },
                {
                    label: 'Lợi nhuận',
                    backgroundColor: 'rgba(210,214,222,1)',
                    borderColor: 'rgba(210,214,222,1)',
                    data: this.arrLoiNhuan
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (tooltipItem: any) => {
                            const value = tooltipItem.raw as number;
                            return tooltipItem.datasetIndex === 0
                                ? 'Doanh thu: ' + value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                                : 'Lợi nhuận: ' + value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                        }
                    }
                }
            }
        }
    });
}


  
}
