import {Component, Inject, OnInit} from "@angular/core";
import {PProduct} from "../../models/products";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductsService} from "../../services/products.service";
import {BasketService} from "../../services/basket.service";
import {SnackBarComponent} from "../decorations/snack-bar/snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    private snackBar: MatSnackBar,
    private basketService: BasketService,
    public dialogRef: MatDialogRef<ProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDetailsDialogData) {
  }
  durationInSeconds = 5
  product!: PProduct
  productSubscription!: Subscription

  ngOnInit(): void {
    console.log(this.data);
  }

  addToBasket(product: PProduct) {
    this.basketService.addBasketItem(product)
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 200,
    });
  }
}
