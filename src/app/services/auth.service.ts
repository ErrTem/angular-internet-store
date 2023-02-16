import {Injectable} from "@angular/core";
import {Observable, of, throwError} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/auth";

@Injectable({
  providedIn: "root" // todo сделать админский модуль и зарегестрировать там?
})
export class AuthService {

  constructor(private router: Router,
              private http: HttpClient) {
  }
  get token(): string {
    return ''
  }

  login(user: User) {
    this.http.post('', user)
  }

  logout() {

  }

  isAuthenticated(): boolean {
  return !!this.token
  }

  private setToken() {

  }

  // setToken(token: string) {
  //   localStorage.setItem("token", token)
  // }

  getToken() {
    return localStorage.getItem("token")
  }

  isLoggedIn() {
    return this.getToken() !== null
  }

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
