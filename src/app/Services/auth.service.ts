import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL: string = 'http://localhost:8055/auth/';


  constructor(private http: HttpClient) {
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}login`, credentials);
  }

  signup(author: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}register`, author);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  currentUser(token: string = this.getToken()): any {
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);
    return decoded;
  }


  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.apiURL}user/refresh-token`, {});
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }
}
