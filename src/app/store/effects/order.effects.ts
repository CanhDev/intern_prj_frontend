import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as OrderActions from '../actions/order.actions';


@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions) {}

  
}
