import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertService.success('Registration successful', '');
      this.authService.login(this.model).subscribe();
    }, error => {
      this.alertService.error('Failed to register user', error);
    }, () => {
      this.router.navigate(['/home']);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);

    this.router.navigate(['/home']);
  }
}
