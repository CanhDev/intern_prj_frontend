import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddUserFormComponent } from './admin-add-user-form.component';

describe('AdminAddUserFormComponent', () => {
  let component: AdminAddUserFormComponent;
  let fixture: ComponentFixture<AdminAddUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddUserFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
