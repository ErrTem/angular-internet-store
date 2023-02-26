import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PProduct} from "../models/products";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  url: string = "http://localhost:3000/products";

  constructor(private http: HttpClient) {
  }

  getProducts() {
    return this.http.get<PProduct[]>(this.url)
  }

  getProduct(id: number) {
    return this.http.get<PProduct>(`${this.url}/${id}`)
  }

  postProduct(product: PProduct) {
    return this.http.post<PProduct>(this.url, product)
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`)
  }

  updateProduct(product: PProduct) {
    return this.http.put<PProduct>(`${this.url}/${product.id}`, product)
  }

}
