import {Injectable} from "@angular/core";
import {BasketItem, PProduct} from "../models/products";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BasketService {
  private basket$: BehaviorSubject<BasketItem[]> = new BehaviorSubject<BasketItem[]>([])

  constructor() {
  }

  getBasket(): Observable<BasketItem[]> {
    return this.basket$.asObservable()
  }

  addBasketItem(newProduct: PProduct) {
    const currentBasket = this.basket$.getValue()
    const inBasketItem = currentBasket.find(({product}) => product.id === newProduct.id)
    if (inBasketItem) {
      inBasketItem.quantity += 1
    } else {
      this.basket$.next([...currentBasket, {product: newProduct, quantity: 1}])
    }

  }
}
