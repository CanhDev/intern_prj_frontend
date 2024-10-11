import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FeedbackEffects } from './feedback.effects';

describe('FeedbackEffects', () => {
  let actions$: Observable<any>;
  let effects: FeedbackEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FeedbackEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(FeedbackEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
