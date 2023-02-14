import {Component, OnInit} from '@angular/core';
import {PProduct} from "../../models/products";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  constructor( private route: ActivatedRoute) {
  }
  product!: PProduct
  productSubscription!: Subscription

  ngOnInit():void {
    this.productSubscription = this.route.data.subscribe((data) => {
      this.product = data['data']
    })
  }
}
