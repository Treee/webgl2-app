import { Injectable, ErrorHandler } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Alert, AlertType } from './alert';


@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  static readonly DEFAULT_ERROR_TITLE: string = 'Something went wrong';

  private _errorMessages: BehaviorSubject<Alert> = new BehaviorSubject(new Alert());

  constructor() { }

  public handleError(error: any) {
  }

  // subscribe to alerts
  getAlert(alertId?: string): Observable<any> {
    return this._errorMessages.asObservable();//.filter((x: Alert) => x && x.alertId === alertId);
  }

  // convenience methods
  success(message: string) {
    this.alert(new Alert({ message, type: AlertType.Success }));
  }

  error(message: string) {
    this.alert(new Alert({ message, type: AlertType.Error }));
  }

  info(message: string) {
    this.alert(new Alert({ message, type: AlertType.Info }));
  }

  warn(message: string) {
    this.alert(new Alert({ message, type: AlertType.Warning }));
  }

  // main alert method
  private alert(alert: Alert) {
    this._errorMessages.next(alert);
  }

  // clear alerts
  clear(alertId?: string) {
    this._errorMessages.next(new Alert({ alertId }));
  }

}
