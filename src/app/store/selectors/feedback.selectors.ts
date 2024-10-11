import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFeedback from '../reducers/feedback.reducer';

export const selectFeedbackState = createFeatureSelector<fromFeedback.State>(
  fromFeedback.feedbackFeatureKey
);
export const selectFeedbacks = createSelector(
  selectFeedbackState,
  (state : fromFeedback.State) => state.feedBacks);

export const selectIsLoadingFeedbacks = createSelector(
  selectFeedbackState,
  (state : fromFeedback.State) => state.isLoadingFeedBacks
);

export const selectIsLoadingFeedback = createSelector(
  selectFeedbackState,
  (state : fromFeedback.State) => state.isLoadingFeedBack
);