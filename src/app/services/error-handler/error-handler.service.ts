import { Injectable, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  static readonly DEFAULT_ERROR_TITLE: string = 'Something went wrong';

  constructor(private router: Router) { }

  public handleError(error: any) {

  }

}
