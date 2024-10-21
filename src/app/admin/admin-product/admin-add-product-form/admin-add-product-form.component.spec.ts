import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddProductFormComponent } from './admin-add-product-form.component';

describe('AdminAddProductFormComponent', () => {
  let component: AdminAddProductFormComponent;
  let fixture: ComponentFixture<AdminAddProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddProductFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
