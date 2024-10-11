import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AccountActions = createActionGroup({
  source: 'Account',
  events: {
    'Load Accounts': emptyProps(),
    'Load Accounts Success': props<{ data: unknown }>(),
    'Load Accounts Failure': props<{ error: unknown }>(),
  }
});
