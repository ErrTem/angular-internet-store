import {Component, OnInit, OnDestroy} from "@angular/core";
import {BasketItem, PProduct} from "../../models/products";
import {Observable, Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {style} from "@angular/animations";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["../products.component.scss"]
})
export class BasketComponent implements OnInit {
  editingQuantity: number = 1
  isInputVisible = true

  constructor(private ProductService: ProductsService,
              private basketService: BasketService) {
  }


  basket$: Observable<BasketItem[]> = new Observable<BasketItem[]>()
  basketSubscription!: Subscription

  ngOnInit(): void {
    this.basket$ = this.basketService.getBasket()

  }

  ngOnDestroy() {
    if (this.basketSubscription) this.basketSubscription.unsubscribe()
  }

  // minusItemFromBasket(item: PProduct) {
  //   if (item.quantity === 1) {
  //     this.ProductService.removeProductFromBasket(item.id).subscribe(() => {
  //       let idx = this.basket$.findIndex((data) => data.id === item.id)
  //       this.basket$.splice(idx, 1)
  //     })
  //
  //   } else {
  //     item.quantity -= 1
  //     this.ProductService.updateProductToBasket(item).subscribe((data) => {
  //     })
  //   }
  // }
  //
  // plusItemFromBasket(item: PProduct) {
  //   item.quantity += 1
  //   this.ProductService.updateProductToBasket(item).subscribe((data) => {
  //   })
  // }

  changeQuantity(event: Event): void {
    let value = (event.target as HTMLInputElement).value
    this.editingQuantity = +value
  }
  //
  // changeBasketItemQuantity(item: PProduct) {
  //   item.quantity = this.editingQuantity
  //   this.ProductService.updateBasketItemQuantity(item).subscribe(() => {
  //   })
  // }

  showInput(event: Event): void {
    let value = (event.target as HTMLInputElement)
    console.log(value.style)
    value.style.display = "flex"


  }
}
