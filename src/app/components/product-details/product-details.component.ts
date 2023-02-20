import {Component, Inject, OnInit} from "@angular/core";
import {PProduct} from "../../models/products";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"]
})
export class ProductDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              public dialogRef: MatDialogRef<ProductDetailsComponent>) {
  }

  product!: PProduct
  productSubscription!: Subscription

  ngOnInit(): void {
    this.productSubscription = this.route.data.subscribe((data) => {
      this.product = data["data"]
    })
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
}
