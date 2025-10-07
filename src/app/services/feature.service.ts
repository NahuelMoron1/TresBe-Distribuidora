import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Feature } from '../models/Feature';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  private myAppUrl: string;
  private myApiUrl: string;
  features: Feature[] = [];
  _features: BehaviorSubject<Feature[]> = new BehaviorSubject<Feature[]>([]);
  private errorService = inject(ErrorService);

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/Features/';
  }
  async readProductFeatures(productID: string) {
    let featuresAux = await this.getProductFeaturesTC(productID);
    if (featuresAux) {
      this.features = featuresAux;
      this._features.next(this.features);
    }
    return this._features.asObservable();
  }
  async getProductFeaturesTC(productID: string) {
    try {
      const data = await this.getProductFeatures(productID).toPromise();
      return data;
    } catch (error) {
      return this.errorService.handleError(
        error,
        'Error leyendo precios por producto'
      );
    }
  }
  async deleteOneFeature(featureID: string, index: number) {
    try {
      await this.deleteFeature(featureID).toPromise();
      this.features.splice(index, 1);
      this._features.next(this.features);
    } catch (error) {
      return this.errorService.handleError(
        error,
        'Error eliminando caracteristica'
      );
    }
  }
  async createFeature(featureAux: Feature) {
    try {
      await this.saveFeature(featureAux).toPromise();
      this.features.unshift(featureAux);
      this._features.next(this.features);
    } catch (error) {
      return this.errorService.handleError(
        error,
        'Error creando caracteristica'
      );
    }
  }
  async updateOneFeature(index: number, featureAux: Feature) {
    try {
      await this.updateFeature(featureAux.id, featureAux).toPromise();
      this.features[index] = featureAux;
      this._features.next(this.features);
    } catch (error) {
      return this.errorService.handleError(
        error,
        'Error modificando caracteristica'
      );
    }
  }
  getFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>(this.myAppUrl + this.myApiUrl, {
      withCredentials: true,
    });
  }
  getFeature(id: string): Observable<Feature> {
    return this.http.get<Feature>(this.myAppUrl + this.myApiUrl + id);
  }
  getProductFeatures(productID: string): Observable<Feature[]> {
    let urlAux = this.myAppUrl + this.myApiUrl + 'product/';
    return this.http.get<Feature[]>(urlAux + productID);
  }
  deleteFeature(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, {
      withCredentials: true,
    });
  }
  deleteFeatures(): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}`, {
      withCredentials: true,
    });
  }
  saveFeature(productAux: Feature): Observable<void> {
    return this.http.post<void>(
      `${this.myAppUrl}${this.myApiUrl}`,
      productAux,
      { withCredentials: true }
    );
  }
  updateFeature(id: string, productAux: Feature): Observable<void> {
    return this.http.patch<void>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      productAux
    );
  }
}
