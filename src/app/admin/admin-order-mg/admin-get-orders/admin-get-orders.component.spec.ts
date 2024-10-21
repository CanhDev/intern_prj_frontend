import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGetOrdersComponent } from './admin-get-orders.component';

describe('AdminGetOrdersComponent', () => {
  let component: AdminGetOrdersComponent;
  let fixture: ComponentFixture<AdminGetOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGetOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGetOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
