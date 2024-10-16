import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
export class AppComponent {
  title = 'intern_prj_frontend';
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
  
}
