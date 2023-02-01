import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PProducts, PProductsConfig} from "../models/products";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url: string = 'http://localhost:3000/products';


  constructor(private http: HttpClient) {
  }

  getProducts() {
    return this.http.get<PProducts[]>(this.url)

  }

  getProduct(id: number) {
    return this.http.get<PProducts>(`${this.url}/${id}`)
  }

  postProduct(product: PProducts) {
    return this.http.post<PProducts>(this.url, product)
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`)
  }

  updateProduct(product: PProducts) {
    return this.http.put<PProducts>(`${this.url}/${product.id}`, product)
  }
}
