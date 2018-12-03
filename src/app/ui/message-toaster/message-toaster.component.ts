import { Component, OnInit, Input } from '@angular/core';

import { Alert, AlertType } from '../../services/error-handler/alert';
import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';

@Component({
  selector: 'app-message-toaster',
  templateUrl: './message-toaster.component.html',
  styleUrls: ['./message-toaster.component.css']
})
export class MessageToasterComponent implements OnInit {

  @Input() id: string;

  alerts: Alert[] = [];

  constructor(private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    this.errorHandlerService.getAlert(this.id).subscribe((alert: Alert) => {
      if (!alert.message) {
        this.alerts = [];
        return;
      } else {
        this.alerts.push(alert);
      }
    });
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  getAlertType(alert: Alert) {
    if (!alert) {
      return;
    }
    let alertType = '';
    if (alert.type === AlertType.Success) {
      alertType = 'success';
    } else if (alert.type === AlertType.Error) {
      alertType = 'danger';
    } else if (alert.type === AlertType.Info) {
      alertType = 'info';
    } else if (alert.type === AlertType.Warning) {
      alertType = 'warning';
    }
    return alertType;
  }

}
