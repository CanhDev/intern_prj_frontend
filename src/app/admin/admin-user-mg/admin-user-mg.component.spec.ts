import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserMgComponent } from './admin-user-mg.component';

describe('AdminUserMgComponent', () => {
  let component: AdminUserMgComponent;
  let fixture: ComponentFixture<AdminUserMgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserMgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserMgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
