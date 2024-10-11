import * as fromItemcart from '../reducers/itemcart.reducer';
import { selectItemcartState } from './itemcart.selectors';

describe('Itemcart Selectors', () => {
  it('should select the feature state', () => {
    const result = selectItemcartState({
      [fromItemcart.itemcartFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
