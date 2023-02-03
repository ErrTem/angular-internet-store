import {Component, OnInit, OnDestroy} from '@angular/core';
import {PProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['../products.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(private ProductService: ProductsService) {
  }

  basket: PProducts[]
  basketSubscription: Subscription

  ngOnInit(): void {
    this.basketSubscription = this.ProductService.getProductFromBasket().subscribe((data) => {
      this.basket = data
    })
  }

  ngOnDestroy() {
    if (this.basketSubscription) this.basketSubscription.unsubscribe()
  }

  minusItemFromBasket(item: PProducts) {
    if (item.quantity === 1) {
      this.ProductService.removeProductFromBasket(item.id).subscribe(() => {
        let idx = this.basket.findIndex((data) => data.id === item.id)
        this.basket.splice(idx, 1)
      })

    } else {
      item.quantity -= 1
      this.ProductService.updateProductToBasket(item).subscribe((data) => {
      })
    }
  }

  plusItemFromBasket(item: PProducts) {
    item.quantity += 1
    this.ProductService.updateProductToBasket(item).subscribe((data) => {
    })
  }
}
