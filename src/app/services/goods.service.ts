import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TGoods} from "../models/goods";

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  url: string = 'http://localhost:3000/goods'
  constructor(private http: HttpClient) { }

  getGoods() {
    return this.http.get<TGoods[]>(this.url)
  }

  getGood(id: number) {
    return this.http.get<TGoods>(`${this.url}/${id}`)
  }
}
