import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../../models/auth";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/)
      ])
    })
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["products"]).then(console.log)
    }
  }

  submit() {
    console.log(this.loginForm)
    if (this.loginForm.invalid) {
      return
    }
    const user: User = {
      email: this.loginForm.value.name,
      password: this.loginForm.value.password
    }
  }



  // submitLogin() {
  //   this.authService.login(this.loginForm.value).subscribe({
  //     next: () => this.router.navigate(['admin']),
  //     error: (err) => alert (err.message)
  //   })
  // }


}
