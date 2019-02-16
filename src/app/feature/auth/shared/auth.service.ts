import { Injectable } from '@angular/core';
import { AuthRequest } from '../model/auth-request';
import { Observable } from 'rxjs';
import { AuthResponse } from '../model/auth-response';
import { map } from 'rxjs/operators';
import { HttpBackendService } from '../../../core/http/http-backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedUser: AuthResponse;
  private readonly loginUrl = 'login';
  private readonly loggeduserkey = 'loggeduser';

  constructor(private httpBackendService: HttpBackendService) {
    const logged = this.getLoggedUser();
    if (logged) {
      this.loggedUser = <AuthResponse>JSON.parse(logged);
    }
  }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.httpBackendService.post<AuthResponse, AuthRequest>(this.loginUrl, authRequest)
      .pipe(
        map((logged: AuthResponse) => {
          this.loggedUser = logged;
          localStorage.setItem(this.loggeduserkey, JSON.stringify(this.loggedUser));
          return logged;
        })
      );
  }

  logout() {
    localStorage.removeItem(this.loggeduserkey);
  }

  isLoggedIn(): boolean {
    return this.getLoggedUser() != null;
  }

  getLoggedUser() {
    return localStorage.getItem(this.loggeduserkey);
  }
}
