import {Component, OnInit} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html"
})
export class SignUpComponent implements OnInit {
  // signupForm: FormGroup
  firebaseErrorMessage: string

  constructor(private authService: AuthService,
              private router: Router,
              private afAuth: AngularFireAuth) {
    this.firebaseErrorMessage = ""
  }

  ngOnInit() {

  }
}
