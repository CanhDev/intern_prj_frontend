import { createFeature, createReducer, on } from '@ngrx/store';
import * as FeedbackActions from '../actions/feedback.actions';
import { FeedBackGet } from 'src/shared/data-get/FeedBackGet';

export const feedbackFeatureKey = 'feedback';

export interface State {
  feedBacks : FeedBackGet[],
  isLoadingFeedBacks : boolean,
  isLoadingFeedBack : boolean
}

export const initialState: State = {
  feedBacks : [],
  isLoadingFeedBacks : false,
  isLoadingFeedBack : false
};

export const reducer = createReducer(
  initialState,
  on(FeedbackActions.getFeedBacks, (state) =>({
    ...state,
    isLoadingFeedBacks: true
  })),
  on(FeedbackActions.getFeedBacksSuccess, (state, {feedBacks}) =>({
    ...state,
    feedBacks : feedBacks,
    isLoadingFeedBacks: false
  })),
  on(FeedbackActions.getFeedBacksFailure, (state) =>({
    ...state,
    feedBacks : [],
    isLoadingFeedBacks: false
  })),
  on(FeedbackActions.SendFeedBack, (state) =>({
    ...state,
    isLoadingFeedBack: true
  })),
  on(FeedbackActions.SendFeedBackSuccess, (state, {item}) =>({
    ...state,
    feedBacks : [...state.feedBacks, item],
    isLoadingFeedBack: false
  })),
  on(FeedbackActions.SendFeedBackFailure, (state) =>({
    ...state,
    isLoadingFeedBack: false
  })),
  on(FeedbackActions.DeleteFeedBack, (state) =>({
    ...state,
    isLoadingFeedBack: true
  })),
  on(FeedbackActions.DeleteFeedBackSuccess, (state, {id}) =>({
    ...state,
    feedBacks : state.feedBacks.filter(item => item.id !== id),
    isLoadingFeedBack: false
  })),
  on(FeedbackActions.DeleteFeedBackFailure, (state) =>({
    ...state,
    isLoadingFeedBack: false
  })),
);

