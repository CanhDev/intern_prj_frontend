import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ItemcartEffects } from './itemcart.effects';

describe('ItemcartEffects', () => {
  let actions$: Observable<any>;
  let effects: ItemcartEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ItemcartEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ItemcartEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
