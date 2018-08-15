import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { ToasterConfig } from '../../../node_modules/angular2-toaster';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  public config: ToasterConfig =
    new ToasterConfig({
        showCloseButton: false,
        tapToDismiss: true,
        timeout: 10000,
        mouseoverTimerStop: true
    });

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(data => {
      this.alertService.success('Logged in successfully', '');
    }, error => {
      this.alertService.error('Failed to login.', error);
    }, () => {
      this.router.navigate(['/home']);
    });
  }

  logout() {
    this.authService.logout();
    this.alertService.message('Logged out', '');
    this.router.navigate(['/home']);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
