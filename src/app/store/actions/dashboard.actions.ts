import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProductGet } from 'src/shared/data-get/ProductGet';

export const GetStatistic = createAction('[Dashboard/API] get statistic',
  props<{startDate?: string, endDate? : string}>()
);
export const GetStatisticSuccess = createAction('[Dashboard/API] get statistic success',
  props<{RevenueStatistics : any}>()
);
export const GetStatisticFailure = createAction('[Dashboard/API] get statistic failure',
  props<{error : string, statusCode: number}>()
); 

//
export const GetTopSelling = createAction('[Dashboard/API] get topselling',
  props<{count? : number}>()
)
export const GetTopSellingSuccess = createAction('[Dashboard/API] get topselling success',
  props<{products : ProductGet[]}>()
)
export const GetTopSellingFailure = createAction('[Dashboard/API] get topselling failure',
  props<{error : string, statusCode : number}>()
)