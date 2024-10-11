import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import * as fromDashboard from '../reducers/dashboard.reducer';

export const selectDashboardState = createFeatureSelector<fromDashboard.State>(
  fromDashboard.dashboardFeatureKey
);

export const selectRevenueStatistics = createSelector(
  selectDashboardState,
  (state : fromDashboard.State) => state.RevenueStatistics
);
export const selectisLoadingStatistics = createSelector(
  selectDashboardState,
  (state : fromDashboard.State) => state.isLoadingStatistics
);
//
export const selectTopProducts = createSelector(
  selectDashboardState,
  (state : fromDashboard.State) => state.TopProducts
);
export const selectisLoadingTopProducts = createSelector(
  selectDashboardState,
  (state : fromDashboard.State) => state.isLoadingTopProducts
);