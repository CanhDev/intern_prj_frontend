import * as fromFeedback from '../reducers/feedback.reducer';
import { selectFeedbackState } from './feedback.selectors';

describe('Feedback Selectors', () => {
  it('should select the feature state', () => {
    const result = selectFeedbackState({
      [fromFeedback.feedbackFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
