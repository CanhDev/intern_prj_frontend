import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditProductFormComponent } from './admin-edit-product-form.component';

describe('AdminEditProductFormComponent', () => {
  let component: AdminEditProductFormComponent;
  let fixture: ComponentFixture<AdminEditProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditProductFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
