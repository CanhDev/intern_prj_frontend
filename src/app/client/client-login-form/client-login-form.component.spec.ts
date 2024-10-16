import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLoginFormComponent } from './client-login-form.component';

describe('ClientLoginFormComponent', () => {
  let component: ClientLoginFormComponent;
  let fixture: ComponentFixture<ClientLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientLoginFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
