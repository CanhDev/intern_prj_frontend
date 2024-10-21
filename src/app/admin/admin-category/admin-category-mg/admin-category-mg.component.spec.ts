import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryMgComponent } from './admin-category-mg.component';

describe('AdminCategoryMgComponent', () => {
  let component: AdminCategoryMgComponent;
  let fixture: ComponentFixture<AdminCategoryMgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategoryMgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoryMgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
