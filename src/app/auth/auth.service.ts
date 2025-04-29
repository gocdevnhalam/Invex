import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '~/environment/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private readonly url = environment.apiUrl + 'refresh-token/';
  constructor(private http: HttpClient) {}

  getAccessToken(): string | null {
    if (this.accessToken) {
      return this.accessToken;
    } else {
      return localStorage.getItem('access_token');
    }
  }

  getRefreshToken(): string | null {
    if (this.refreshToken) {
      return this.refreshToken;
    } else {
      return localStorage.getItem('refresh_token');
    }
  }

  setTokens(access: string, refresh: string): void {
    this.accessToken = access;
    this.refreshToken = refresh;
    if (this.accessToken && this.refreshToken) {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
    }
  }
  saveAccessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  saveRefreshToken(token: string) {
    localStorage.setItem('refresh_token', token);
  }
  getNewToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http
      .post<any>('/auth/refresh-token', { refreshToken })
      .pipe(map((response) => response.accessToken));
  }
  setAccessToken(token: string) {
    localStorage.setItem('access_token', token);
  }
  logout() {
    localStorage.clear();
    window.location.href = '';
  }
  clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  isTokenExpired(token: string, bufferSeconds: number = 3): boolean {
    if (!token) {
      return true;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
      if (!expiry) {
        return true;
      }

      const now = Math.floor(Date.now() / 1000);
      return expiry - bufferSeconds < now;
    } catch (error) {
      return true;
    }
  }
}
