import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderXproducts } from '../models/OrderXproduct';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersXProductsService {
  private myAppUrl: string;
  private myApiUrl: string;
  private errorService = inject(ErrorService);

  private oxp: OrderXproducts = new OrderXproducts('', '', '', 0);
  private oxps: OrderXproducts[] = [];
  private _oxps: BehaviorSubject<OrderXproducts[]> = new BehaviorSubject<
    OrderXproducts[]
  >([]);
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/OrdersXproducts/';
  }
  async readOxp(orderID: string) {
    let ordersAux = await this.setOxpByOrders(orderID);
    if (ordersAux != undefined) {
      this.oxps = ordersAux;
      this._oxps.next(this.oxps);
    }
    return this._oxps.asObservable();
  }
  async setOxpByOrders(orderID: string) {
    try {
      const data = await this.getOxpByOrders(orderID).toPromise();
      return data;
    } catch (error) {
      return this.errorService.handleError(
        error,
        'Error leyendo precios por producto'
      );
    }
  }
  getOrdersXproducts(): Observable<OrderXproducts[]> {
    return this.http.get<OrderXproducts[]>(this.myAppUrl + this.myApiUrl, {
      withCredentials: true,
    });
  }
  getOrderXproducts(id: string): Observable<OrderXproducts> {
    return this.http.get<OrderXproducts>(this.myAppUrl + this.myApiUrl + id, {
      withCredentials: true,
    });
  }
  getOxpByOrders(orderID: string) {
    let urlAux = this.myAppUrl + this.myApiUrl + 'orders/';
    return this.http.get<OrderXproducts[]>(urlAux + orderID);
  }
  deleteOrderXproducts(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, {
      withCredentials: true,
    });
  }
  deleteOrderXproductsByIDs(
    productID: string,
    orderID: string
  ): Observable<void> {
    let urlAux =
      this.myAppUrl + this.myApiUrl + 'products/' + productID + '/' + orderID;
    return this.http.delete<void>(urlAux, { withCredentials: true });
  }
  deleteOrdersXproducts(): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}`, {
      withCredentials: true,
    });
  }
  saveOrderXproducts(productAux: OrderXproducts): Observable<void> {
    return this.http.post<void>(
      `${this.myAppUrl}${this.myApiUrl}`,
      productAux,
      { withCredentials: true }
    );
  }
  updateOrderXproducts(
    id: string,
    productAux: OrderXproducts
  ): Observable<void> {
    return this.http.patch<void>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      productAux
    );
  }
}
