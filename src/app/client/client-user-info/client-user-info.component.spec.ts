import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientUserInfoComponent } from './client-user-info.component';

describe('ClientUserInfoComponent', () => {
  let component: ClientUserInfoComponent;
  let fixture: ComponentFixture<ClientUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientUserInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
