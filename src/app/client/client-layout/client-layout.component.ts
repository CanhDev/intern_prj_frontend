import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Logout } from 'src/app/store/actions/account.actions';
import { GetUserAsync_Client } from 'src/app/store/actions/user.actions';
import { selectUser_client } from 'src/app/store/selectors/user.selectors';
import { UserGet } from 'src/shared/data-get/UserGet';
import { AccountService } from 'src/shared/services/account/account.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* => *', [
        style({ opacity: 0 }), 
        animate('300ms ease-in', style({ opacity: 1 })) 
      ]),
      transition('* => *', [
        animate('300ms ease-out', style({ opacity: 0 })) 
      ])
    ])
  ]
})
export class ClientLayoutComponent {
  user_client$ : Observable<UserGet | null>;
  isAuthenticated$ : Observable<boolean>;
  
  constructor(private store : Store, private accountService : AccountService, private router : Router){
    this.user_client$ = this.store.select(selectUser_client);
    this.isAuthenticated$ = this.accountService.isAuthenticated();
  }
  ngOnInit(){
    this.isAuthenticated$.pipe(
      map((res : boolean) => {
        if(res) {
          this.store.dispatch(GetUserAsync_Client());
        }
      })
    ).subscribe();
  }
  Logout(){
    this.store.dispatch(Logout());
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
