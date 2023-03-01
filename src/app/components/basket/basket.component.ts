import {Component, OnInit, OnDestroy} from "@angular/core";
import {BasketItem, PProduct} from "../../models/products";
import {map, Observable, Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {style} from "@angular/animations";
import {BasketService} from "../../services/basket.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html"
})
export class BasketComponent implements OnInit {
  editingQuantity: number = 1
  isInputVisible = true

  totalPrice$!: Observable<number>
  basket$: Observable<BasketItem[]> = new Observable<BasketItem[]>()

  constructor(private ProductService: ProductsService,
              private basketService: BasketService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.basket$ = this.basketService.getBasket()
    this.totalPrice$ = this.basket$
      .pipe(
        map((product) => product
          .reduce((accum, {quantity, product}) => accum + quantity * product.price, 0))
      )
  }

  minusFromBasket(product: PProduct) {
    this.basketService.removeBasketItem(product)
  }

  addToBasket(product: PProduct) {
    this.basketService.addBasketItem(product)
  }
}
