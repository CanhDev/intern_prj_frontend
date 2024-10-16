import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountService } from '../services/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor( private accountService : AccountService, private router : Router){}

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> {
      return this.accountService.isAuthenticated().pipe(
        map((res: boolean) => {
          if (res) {
            return true; 
          } else {
            this.router.navigate(['/Login']); 
            return false; 
          }
        })
      );
    }
}
