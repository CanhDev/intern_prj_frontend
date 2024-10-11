import * as fromProduct from '../reducers/product.reducer';
import { selectProductState } from './product.selectors';

describe('Product Selectors', () => {
  it('should select the feature state', () => {
    const result = selectProductState({
      [fromProduct.productFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
