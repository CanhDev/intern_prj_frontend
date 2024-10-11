import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { FeedBackGet } from 'src/shared/data-get/FeedBackGet';
import { FeedBackSend } from 'src/shared/data-send/FeedBackSend';

export const getFeedBacks = createAction('[FeedBacks/API] get feedbacks',
  props<{orderId : number}>()
)
export const getFeedBacksSuccess =
 createAction('[FeedBacks/API] get feedbacks success',
  props<{feedBacks : FeedBackGet[]}>()
)
export const getFeedBacksFailure = createAction('[FeedBacks/API] get feedbacks failure',
  props<{error : string, statusCode : number}>()
)
export const SendFeedBack = createAction('[FeedBacks/API] send feedbacks',
  props<{item : FeedBackSend}>()
)
export const SendFeedBackSuccess =
 createAction('[FeedBacks/API] send feedbacks success',
  props<{item : FeedBackGet}>()
)
export const SendFeedBackFailure = createAction
('[FeedBacks/API] send feedbacks failure',
  props<{error : string, statusCode : number}>()
);

export const DeleteFeedBack = createAction('[FeedBacks/API] delete feedbacks',
  props<{id : number}>()
);
export const DeleteFeedBackSuccess =
 createAction('[FeedBacks/API] delete feedbacks success',
  props<{id : number}>()
);
export const DeleteFeedBackFailure =
createAction('[FeedBacks/API] delete feedbacks failure',
  props<{error : string, statusCode: number}>()
);