import {Injectable} from "@angular/core";
import {Observable, of, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/auth";
import {environment} from "../environments/environment";
import {FbAuthResponse} from "../models/interface";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: "root" // todo сделать админский модуль и зарегестрировать там?
})
export class AuthService {

  isUserLoggedIn: boolean

  constructor(private router: Router,
              private http: HttpClient,
              private afAuth: AngularFireAuth) {
    this.isUserLoggedIn = false

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.isUserLoggedIn = true
      } else {
        this.isUserLoggedIn = false
      }
    })
  }

  afLogout(): void {
    this.afAuth.signOut()
  }

  signupUser(user: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        let emailLower = user.email.toLowerCase();
        result.user?.sendEmailVerification()
      })
      .catch(error => {
        console.log("Auth Service: signup error", error);
        if (error.code)
          return {isValid: false, message: error.message}
        else return //todo fix that
      })
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Auth service: loginUser:success")
      })
      .catch(error => {
        console.log("Auth Service: login error...")
        console.log("error code", error.code)
        console.log("error", error)
        if (error.code)
          return {isValid: false, message: error.message}
        else return
      })
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
    return this.isUserLoggedIn
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
