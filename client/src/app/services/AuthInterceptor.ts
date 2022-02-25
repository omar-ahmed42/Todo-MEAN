import {HTTP_INTERCEPTORS, HttpEvent} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {HttpInterceptor, HttpHandler, HttpRequest} from "@angular/common/http";

import {Observable} from "rxjs";
import {AccessTokenStorageService} from "./access-token-storage.service";

const AUTH_HEADER = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private access_token: AccessTokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.access_token.getAccessToken();
    // console.log("Access TOKEN" + token);
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(AUTH_HEADER, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

