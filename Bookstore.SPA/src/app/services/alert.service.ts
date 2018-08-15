import { Injectable } from '@angular/core';
import { ToasterService } from '../../../node_modules/angular2-toaster';

@Injectable()
export class AlertService {
  constructor(private toasterService: ToasterService) {}

  success(title: string, message: string) {
    this.toasterService.pop('success', title, message);
  }

  error(title: string, message: string) {
    this.toasterService.pop('error', title, message);
  }

  warning(title: string, message: string) {
    this.toasterService.pop('warning', title, message);
  }

  message(title: string, message: string) {
    this.toasterService.pop('info', title, message);
  }

  alert(title: string, message: string) {
    this.toasterService.pop('warning', title, message);
  }
}
