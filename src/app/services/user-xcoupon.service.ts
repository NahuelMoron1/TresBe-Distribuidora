import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserXcoupon } from '../models/UserXcoupon';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class UserXcouponService {
  private myAppUrl: string;
  private myApiUrl: string;
  private errorService = inject(ErrorService);

  userXcoupon: UserXcoupon = new UserXcoupon('', '', '');
  _userXcoupon: BehaviorSubject<UserXcoupon> = new BehaviorSubject<UserXcoupon>(
    this.userXcoupon
  );
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/userXcoupon/';
  }
  async readUser(userID: string, couponID: string) {
    let userAux = await this.getUserTC(userID, couponID);
    if (userAux) {
      this.userXcoupon = userAux;
    }
    return this.userXcoupon;
  }
  returnUser() {
    return this._userXcoupon.asObservable();
  }
  async getUserTC(userID: string, couponID: string) {
    try {
      const data = await this.getUser(userID, couponID).toPromise();
      return data;
    } catch (error) {
      return this.errorService.handleError(
        error,
        'Error leyendo precios por producto'
      );
    }
  }
  getUser(userID: string, couponID: string): Observable<UserXcoupon> {
    return this.http.get<UserXcoupon>(
      this.myAppUrl + this.myApiUrl + userID + '/' + couponID
    );
  }
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, {
      withCredentials: true,
    });
  }
  deleteUsers(): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}`, {
      withCredentials: true,
    });
  }
  saveUser(productAux: UserXcoupon): Observable<void> {
    return this.http.post<void>(
      `${this.myAppUrl}${this.myApiUrl}`,
      productAux,
      { withCredentials: true }
    );
  }
  updateUser(id: string, productAux: UserXcoupon): Observable<void> {
    return this.http.patch<void>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      productAux
    );
  }
}
