import {Component, OnInit} from '@angular/core';
import {PProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: PProducts;
  productSubscription: Subscription
  constructor( private route: ActivatedRoute) {
  }

  ngOnInit():void {
    this.productSubscription = this.route.data.subscribe((data) => {
      this.product = data['data']
    })
  }
}
