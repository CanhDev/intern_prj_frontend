import * as fromUser from '../reducers/user.reducer';
import { selectUserState } from './user.selectors';

describe('User Selectors', () => {
  it('should select the feature state', () => {
    const result = selectUserState({
      [fromUser.userFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
