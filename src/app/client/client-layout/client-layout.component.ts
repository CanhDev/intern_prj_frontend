import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { slideInAnimation } from 'src/app/route-animations';
import { Logout } from 'src/app/store/actions/account.actions';
import { GetUserAsync_Client } from 'src/app/store/actions/user.actions';
import { selectUser_client } from 'src/app/store/selectors/user.selectors';
import { UserGet } from 'src/shared/data-get/UserGet';
import { AccountService } from 'src/shared/services/account/account.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css'],
  animations: [slideInAnimation]
})
export class ClientLayoutComponent implements OnInit, AfterViewInit {
  user_client$: Observable<UserGet | null>;
  isAuthenticated$: Observable<boolean>;
  myUser: UserGet | null = null; // Khởi tạo với giá trị mặc định là null
  isMobileNavOpen: boolean = false;

  constructor(
    private store: Store,
    private accountService: AccountService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.user_client$ = this.store.select(selectUser_client);
    this.isAuthenticated$ = this.accountService.isAuthenticated();
  }

  ngOnInit() {
    setTimeout(() => {
      this.isAuthenticated$.pipe(
        map((isAuthenticated: boolean) => {
          if (isAuthenticated) {
            this.store.dispatch(GetUserAsync_Client());
            this.user_client$.pipe(
              map((user: UserGet | null) => {
                this.myUser = user; 
              })
            ).subscribe();
          }
        })
      ).subscribe();
    });
  }


  Logout() {
    this.store.dispatch(Logout());
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  

  toggleMobileNav() {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  navigateAndToggle(route: string) {
    this.router.navigate([route]);
    this.toggleMobileNav();
  }
}
