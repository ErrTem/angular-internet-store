import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
  }
}
