import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  loginUrl = environment.apiUrl + 'login/';

  constructor(private _http: HttpClient) {}
  login(data: any) {
    return this._http.post(this.loginUrl, {
      username: data.username,
      password: data.password,
    });
  }
}
