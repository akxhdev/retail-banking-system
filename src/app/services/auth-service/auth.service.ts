import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { AppUser } from 'src/app/models/app_user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private readonly host =
  // 'http://ec2-3-80-241-148.compute-1.amazonaws.com:8082/authentication-ms';
  private readonly host = 'http://localhost:8082/authentication-ms';

  isAuthenticated = new Subject<boolean>();
  clearTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  // login function
  public login(user: {
    userId: string;
    password: string;
    role: string;
  }): Observable<AppUser> {
    // this.autoLogout(360000);
    return this.httpClient.post<AppUser>(this.host + '/login', user);
  }

  public logout() {
    // this.router.navigate(['/']);

    // original code
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');

    // clear auto timer
    if (this.clearTimer) {
      clearTimeout(this.clearTimer);
    }

    // navigate to home page
    this.router.navigate(['/']);
    this.isAuthenticated.next(false);
  }

  public autoLogout(expirationDate: number) {
    console.log(expirationDate);
    this.clearTimer = setTimeout(() => {
      this.logout();
    }, expirationDate);
  }

  public getHeader(): HttpHeaders {
    // get toke from local storage
    let token: string | null = localStorage.getItem('token');

    // if token is null then throw error
    if (token == null) {
      throw new Error('Token is null');
    }

    // create header
    let header = new HttpHeaders().set('Authorization', token);

    return header;
  }

  public getUserId(): string {
    let userId: string | null = localStorage.getItem('userId');

    // if token is null then throw error
    if (userId == null) {
      throw new Error('user ID is null');
    }

    return userId;
  }

  public getName(): string {
    let name: string | null = localStorage.getItem('name');

    // if token is null then throw error
    if (name == null) {
      throw new Error('Name is null');
    }

    return name;
  }
}
