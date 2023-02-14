import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {BasketService} from "../../../services/basket.service";
import {map, Observable, switchMap} from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  private itemsCount!: Observable<number>;

  constructor(private authService: AuthService,
              private basketService: BasketService) {
  }

  ngOnInit(): void {
    this.itemsCount = this.basketService.getBasket()
      .pipe(map(basket => ))
    // todo bages total count
    // rxjs switch map - посчитать каждый obs
  }

  logout() {
    this.authService.logout()
  }
}
