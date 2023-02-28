import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../../services/auth.service";
import {BasketService} from "../../../services/basket.service";
import {debounceTime, map, Observable, tap} from "rxjs";

const BADGE_LIMIT = 99;
const MAX_LIMIT = "99";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

  itemsCount$!: Observable<number>
  itemsCountRound$!: Observable<string>
  itemCountHidden$!: Observable<boolean>

  constructor(private authService: AuthService,
              private basketService: BasketService) {
  }

  ngOnInit(): void {
    this.itemsCount$ = this.basketService.getBasket()
      .pipe(
        map((product) => product.reduce((accum, {quantity}) => accum + quantity, 0))
      )

    this.itemsCountRound$ = this.itemsCount$
      .pipe(
        map(itemCount => itemCount > BADGE_LIMIT ? MAX_LIMIT : String(itemCount))
      )

    this.itemCountHidden$ = this.itemsCount$
      .pipe(
        map(itemCount => itemCount === 0)
      )
  }

}
