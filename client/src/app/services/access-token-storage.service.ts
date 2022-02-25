import { Injectable } from '@angular/core';

const ACCESS_TOKEN = 'token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AccessTokenStorageService {

  constructor() { }

  logout(): void {
    window.localStorage.clear();
  }

  public saveAccessToken(access_token: string): void {
    window.localStorage.removeItem(ACCESS_TOKEN);
    window.localStorage.setItem(ACCESS_TOKEN, access_token);
  }

  public getAccessToken(): string | null {
    return window.localStorage.getItem(ACCESS_TOKEN);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, user);
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return user;
    }
    return {};
  }


}
