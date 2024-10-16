import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInfoMgComponent } from './admin-info-mg.component';

describe('AdminInfoMgComponent', () => {
  let component: AdminInfoMgComponent;
  let fixture: ComponentFixture<AdminInfoMgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInfoMgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInfoMgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
