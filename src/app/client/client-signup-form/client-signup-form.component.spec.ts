import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSignupFormComponent } from './client-signup-form.component';

describe('ClientSignupFormComponent', () => {
  let component: ClientSignupFormComponent;
  let fixture: ComponentFixture<ClientSignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSignupFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientSignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
