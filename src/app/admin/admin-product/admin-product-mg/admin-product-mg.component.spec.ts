import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductMgComponent } from './admin-product-mg.component';

describe('AdminProductMgComponent', () => {
  let component: AdminProductMgComponent;
  let fixture: ComponentFixture<AdminProductMgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductMgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductMgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
