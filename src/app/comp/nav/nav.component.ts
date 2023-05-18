import { finalize, map, Observable, shareReplay, Subscription } from 'rxjs';
import { EventBusService } from 'src/app/_shared/event-bus.service';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { StorageService } from '../../auth/storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private eventBusService: EventBusService
  ) {}
  eventBusSub?: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  isLoggedIn: boolean = false;

  ngOnInit() {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.username = this.storageService.getUser()?.login ?? 'Guest';
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      console.log("Log out")
      this.logout();
    });
  }

  username = 'Guest';

  logout() {
    this.authService
      .logout()
      .pipe(
        finalize(() => {
          this.storageService.clean();
          this.username = 'Guest';
          this.router.navigateByUrl('/home');
          window.location.reload();
        })
      )
      .subscribe();
  }
}
