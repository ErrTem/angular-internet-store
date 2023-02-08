import {Component, OnInit, OnDestroy} from '@angular/core';
import {PProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {style} from "@angular/animations";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['../products.component.scss']
})
export class BasketComponent implements OnInit {
  editingQuantity: number
  isInputVisible = true

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

  changeQuantity(event: Event): void {
    let value = (event.target as HTMLInputElement).value
    this.editingQuantity = +value
  }

  changeBasketItemQuantity(item:PProducts) {
    item.quantity = this.editingQuantity
    this.ProductService.updateBasketItemQuantity(item).subscribe(()=> {})
  }

  showInput(event: Event): void {
    let value = (event.target as  HTMLInputElement)
    console.log(value.style)
    value.style.display = 'flex'


  }
}
