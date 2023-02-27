import {Injectable} from "@angular/core";
import {Observable, of, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/auth";
import {environment} from "../environments/environment";
import {FbAuthResponse} from "../models/interface";

@Injectable({
  providedIn: "root" // todo сделать админский модуль и зарегестрировать там?
})
export class AuthService {
  constructor(private router: Router,
              private http: HttpClient,) {
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem("fb-token", response.idToken)
      localStorage.setItem("fb-token-exp", expDate.toString())
    } else {
      localStorage.clear()
    }
  }

  get token(): string {
    return ""
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http
      .post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
      )
  }

  logout() {
    this.setToken((null))
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  getToken() {
    return localStorage.getItem("token")
  }

  isLoggedIn() {
    return this.getToken() !== null
  }

  // setToken(token: string) {
  //   localStorage.setItem("token", token)
  // }
  // login(userInfo: { email: string, password: string }): Observable<string | boolean> {
  //   if (userInfo.email === "admin@gmail.com" && userInfo.password === "admin123") {
  //     this.setToken("dasghasehsfhserfdsfawd")
  //     return of(true)
  //   }
  //   return throwError(()=> new Error('Failed Login'))
  // }
  // logout() {
  //   this.router.navigate(['login'])
  // }
}
