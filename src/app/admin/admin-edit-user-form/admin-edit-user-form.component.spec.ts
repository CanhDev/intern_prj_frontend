import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditUserFormComponent } from './admin-edit-user-form.component';

describe('AdminEditUserFormComponent', () => {
  let component: AdminEditUserFormComponent;
  let fixture: ComponentFixture<AdminEditUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditUserFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
