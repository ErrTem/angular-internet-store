import {Component, OnDestroy, OnInit} from "@angular/core";
import {GoodsService} from "../../services/goods.service";
import {Subscription} from "rxjs";
import {TGoods} from "../../models/goods";

@Component({
  selector: "app-base",
  templateUrl: "./base.component.html",
  styleUrls: ["./base.component.scss"]
})
export class BaseComponent implements OnInit, OnDestroy {
  constructor(private goodsService: GoodsService) {
  }
  goodsSubscription: Subscription
  goods: TGoods[]

  ngOnInit(): void {
    this.goodsSubscription = this.goodsService.getGoods()
      .subscribe((data)=> this.goods = data)
  }
  ngOnDestroy():void {
    if (this.goodsSubscription) this.goodsSubscription.unsubscribe()
  }

}
