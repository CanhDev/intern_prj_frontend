import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditCategoryFormComponent } from './admin-edit-category-form.component';

describe('AdminEditCategoryFormComponent', () => {
  let component: AdminEditCategoryFormComponent;
  let fixture: ComponentFixture<AdminEditCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditCategoryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
