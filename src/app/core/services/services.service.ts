import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service {
  loginUrl = environment.apiUrl + 'login/';
  private readonly getProductURL = environment.apiCommon + '/products/get/';
  private readonly getAllOrderItemURL = environment.apiCommon + '/order/get/';
  constructor(private _http: HttpClient) {}
  login(data: any) {
    return this._http.post(this.loginUrl, {
      username: data.username,
      password: data.password,
      token: data.token,
    });
  }
  getUserData(token: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<any>(this.loginUrl, { headers });
  }
  getProductApi(): Observable<any> {
    return this._http.get<any>(this.getProductURL);
  }
  getAllOrderItem(data: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('limit', data.limit);
    return this._http.get<any>(this.getAllOrderItemURL, { params });
  }
}
