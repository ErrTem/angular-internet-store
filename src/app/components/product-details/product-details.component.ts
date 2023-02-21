import {Component, Inject, OnInit} from "@angular/core";
import {PProduct} from "../../models/products";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface ProductDetailsDialogData {
  product: PProduct,
}

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"]
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDetailsDialogData) {
  }

  product!: PProduct
  productSubscription!: Subscription

  ngOnInit(): void {
    console.log(this.data);
  }

  sucsess() {
    this.dialogRef.close("yes")
  }

  unSucsess() {
    this.dialogRef.close("nope")
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
}
