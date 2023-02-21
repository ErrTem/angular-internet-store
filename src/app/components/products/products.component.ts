import {Component, OnInit} from "@angular/core";
import {BasketItem, PProduct} from "../../models/products";
import {map, Observable} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";
import {ActivatedRoute, Router} from "@angular/router";
import {BasketService} from "../../services/basket.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarComponent} from "../decorations/snack-bar/snack-bar.component";
import {ProductDetailsComponent, ProductDetailsDialogData} from "../product-details/product-details.component";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["../products.component.scss"]
})
export class ProductsComponent implements OnInit {
  constructor(private ProductsService: ProductsService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private basketService: BasketService,
              private snackBar: MatSnackBar) {
  }

  durationInSeconds = 5

  isLoading!: Observable<boolean>

  products: PProduct[] = []
  products$!: Observable<PProduct[]>

  basket$!: Observable<BasketItem[]>

  canEdit: boolean = false // todo admin logic and authorization
  canView: boolean = false

  ngOnInit(): void {
    this.canEdit = true
    this.products$ = this.ProductsService.getProducts()
    this.basket$ = this.basketService.getBasket()
    this.products$
      .pipe(
        map((products) => {
          const [, , productId] = this.router.url.split("/")
          return products.find((product) => productId === String(product.id))
        })
      )
      .subscribe((product) => {
        product && this.openProduct(product)
      })
  }

  openProduct(product: PProduct): void {
    const dialogRef = this.dialog.open<ProductDetailsComponent, ProductDetailsDialogData>(ProductDetailsComponent, {
      width: "500px",
      height: "500px",
      data: {product},
      // disableClose: true
    })
    dialogRef.afterClosed().subscribe(console.log)
  }

  addToBasket(product: PProduct) {
    this.basketService.addBasketItem(product)
  }

// todo logic for update basket

  updateToBasket(product: PProduct) {
    // product.quantity += 1
    this.ProductsService.updateProductToBasket(product).subscribe(() => {
    })
  }

  deleteItem(id: number) {
    this.ProductsService.deleteProduct(id).subscribe(() => this.products.find((item) => {
      if (id === item.id) {
        let idx = this.products.findIndex((data) => data.id === id)
        this.products.splice(idx, 1)
      }
    }))
  }

  openDialog(product?: PProduct): void {
    let dialogConfig = new MatDialogConfig()
    dialogConfig.width = "500px"

    dialogConfig.disableClose = true
    dialogConfig.data = product
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data && data.id)
          this.updateData(data)
        else
          this.postData(data)
      }
    })
  }

// todo postData

  postData(data: PProduct) {
    this.ProductsService.postProduct(data).subscribe((data) => {
      this.products.push(data)
    })
  }

  updateData(product: PProduct) {
    this.ProductsService.updateProduct(product).subscribe((data) => {
      this.products = this.products.map((product) => {
        if (product.id === data.id) return data
        else return product
      })
    })
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 200,
    });
  }
}
