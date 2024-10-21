import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCategoryFormComponent } from './admin-add-category-form.component';

describe('AdminAddCategoryFormComponent', () => {
  let component: AdminAddCategoryFormComponent;
  let fixture: ComponentFixture<AdminAddCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddCategoryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
