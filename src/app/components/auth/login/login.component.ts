import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../../models/auth";

const minEmailLength = 5;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.minLength(minEmailLength)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/)
    ])
  })

  readonly errorLoginMap: { [key: string]: string } = {
    email: "email is required",
    minlength: `should be more than ${minEmailLength} symbols`,
    required: "write something pls"
  }

  readonly errorPasswordMap: { [key: string]: string } = {
    required: "please type your password",
    pattern: "should be at least 8 symbols and letters"
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void { // todo перенеси отсюда
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["products"])
    }
  }

  get emailControl(): FormControl {
    return this.loginForm.get("email") as FormControl
  }

  get emailControlError(): string | null {
    const errors = this.emailControl.errors ?? {}
    const errorKeys = Object.keys(errors)
    return errorKeys.length ? errorKeys[0] : null
  }

  get passwordControl(): FormControl {
    return this.loginForm.get("password") as FormControl
  }

  get passwordControlError(): string | null {
    const errors = this.passwordControl.errors ?? {}
    const errorKeys = Object.keys(errors)
    return errorKeys.length ? errorKeys[0] : null
  }

  submit() {
    if (this.loginForm?.invalid) {
      return
    }
    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.authService.login(user).subscribe(() => {
      this.loginForm.reset()
      this.router.navigate(["/products"])
    })
  }


  // submitLogin() {
  //   this.authService.login(this.loginForm.value).subscribe({
  //     next: () => this.router.navigate(['admin']),
  //     error: (err) => alert (err.message)
  //   })
  // }


}
