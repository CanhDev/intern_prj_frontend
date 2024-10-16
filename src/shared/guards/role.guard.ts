import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { AccountService } from '../services/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private accountService : AccountService, private router : Router){}

  canActivate(route : ActivatedRouteSnapshot) : Observable<boolean>{
    const expectedRole = route.data['role'];
    return this.accountService.isAuthenticated().pipe(
      map((isAuthenticated : boolean) =>{
        if(isAuthenticated && this.accountService.hasRole(expectedRole)){
          return true;
        }
        else{
          this.router.navigate(['/unauthorized']);
          return false;
        }
    }),
    catchError(()=>{
      this.router.navigate(['/unauthorized']);
      return [false];
    }));
  }
  
}
