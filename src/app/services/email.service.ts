import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private myAppUrl: string;
  private myApiUrl: string;
  private errorService = inject(ErrorService);

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/email/';
  }
  async sendEmailTC(to: string | string[], subject: string, text: string) {
    try {
      await this.sendEmail(to, subject, text).toPromise();
    } catch (error) {
      return this.errorService.handleError(
        error,
        'Error leyendo precios por producto'
      );
    }
  }
  sendEmail(to: string | string[], subject: string, text: string) {
    const emailData = {
      to: to,
      subject: subject,
      text: text,
    };
    let urlAux = this.myAppUrl + this.myApiUrl;
    return this.http.post<void>(urlAux, emailData);
  }
}
