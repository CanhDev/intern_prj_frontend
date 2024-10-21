import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangeStatusOrderComponent } from './admin-change-status-order.component';

describe('AdminChangeStatusOrderComponent', () => {
  let component: AdminChangeStatusOrderComponent;
  let fixture: ComponentFixture<AdminChangeStatusOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChangeStatusOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChangeStatusOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
