import { createFeature, createReducer, on } from '@ngrx/store';
import * as DashboardActions from '../actions/dashboard.actions';
import { ProductGet } from 'src/shared/data-get/ProductGet';

export const dashboardFeatureKey = 'dashboard';

export interface State {
  RevenueStatistics : any;
  TopProducts : ProductGet[] | null;
  isLoadingStatistics : boolean;
  isLoadingTopProducts : boolean
}

export const initialState: State = {
  RevenueStatistics :  [],
  TopProducts : [],
  isLoadingStatistics : false,
  isLoadingTopProducts : false
};

export const reducer = createReducer(
  initialState,
  on(DashboardActions.GetStatistic, (state) =>({
    ...state,
    isLoadingStatistics: true
  })),
  on(DashboardActions.GetStatisticSuccess, (state, {RevenueStatistics}) =>({
    ...state,
    RevenueStatistics : RevenueStatistics,
    isLoadingStatistics: false
  })),
  on(DashboardActions.GetStatisticFailure, (state) =>({
    ...state,
    RevenueStatistics : [],
    isLoadingStatistics: false
  })),
  on(DashboardActions.GetTopSelling, (state) =>({
    ...state,
    isLoadingTopProducts: true
  })),
  on(DashboardActions.GetTopSellingSuccess, (state, {products}) =>({
    ...state,
    TopProducts : products,
    isLoadingTopProducts: false
  })),
  on(DashboardActions.GetStatisticFailure, (state) =>({
    ...state,
    TopProducts : [],
    isLoadingTopProducts: false
  })),
)

