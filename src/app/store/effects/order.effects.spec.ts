import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { OrderEffects } from './order.effects';

describe('OrderEffects', () => {
  let actions$: Observable<any>;
  let effects: OrderEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(OrderEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
