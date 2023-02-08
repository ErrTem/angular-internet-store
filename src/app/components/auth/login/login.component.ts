import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  emailFormControl = new FormControl("", [Validators.required, Validators.email])

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  submitLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['admin']),
      error: (err) => alert (err.message)
    })
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "email": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", [
        Validators.required,
        Validators.pattern(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/)
      ])
    })
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['products'])
    }
  }


}
