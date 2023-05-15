import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { StorageService } from './../../auth/storage.service';
import { Component } from '@angular/core';
import { Observable, Subscription, finalize, map, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { EventBusService } from 'src/app/_shared/event-bus.service';

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
    // this.authService.authenticate().subscribe({
    //   next: (user: User) => {
    //     this.username = user.login;
    //     this.storageService.saveUser(user);
    //   },
    //   error: () => {
    //     this.username = 'Guest';
    //   },
    // });
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
          // FIXME: Totally non-angularish way of refreshing
          // A work around for the username, not refreshing after logging out
          window.location.reload();
        })
      )
      .subscribe();
  }
}
