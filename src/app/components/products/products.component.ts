import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {BasketItem, PProduct} from "../../models/products";
import {Observable, switchMap} from "rxjs";
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
  templateUrl: "./products.component.html"
})
export class ProductsComponent implements OnInit {
  constructor(private productsService: ProductsService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private basketService: BasketService,
              private snackBar: MatSnackBar) {
  }

  durationInSeconds = 5

  products: PProduct[] = []
  products$!: Observable<PProduct[]>

  basket$!: Observable<BasketItem[]>

  canEdit: boolean = false // todo admin logic and authorization
  canView: boolean = false

  ngOnInit(): void {
    this.canEdit = true
    this.products$ = this.productsService.getProducts()
    this.basket$ = this.basketService.getBasket()
  }

  addToBasket(product: PProduct) {
    this.basketService.addBasketItem(product)
  }

  openProduct(product: PProduct): void {
    const dialogRef = this.dialog
      .open<ProductDetailsComponent, ProductDetailsDialogData>(ProductDetailsComponent, {
        width: "auto",
        height: "auto",
        data: {product},
        // disableClose: true
      })
  }

  deleteItem(product: PProduct) {
    this.products$ = this.productsService.deleteProduct(product.id)
      .pipe(
        switchMap(() => this.productsService.getProducts()) //todo зачем пайп? меняем стрим или как?
      )
  }

  openDialog(product?: PProduct): void { //todo почему после product нужен ?
    let dialogConfig = new MatDialogConfig()
    dialogConfig.width = "500px"
    dialogConfig.disableClose = true
    dialogConfig.data = product
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((data) => {
      if (data) { //todo можно ли обойтись одним ИФ
        if (data && data.id)
          this.updateData(data)
        else
          this.postData(data)
      }
    })
  }

  updateData(product: PProduct) {
    this.productsService.updateProduct(product)
    this.products$ = this.productsService.getProducts()
    // this.productsService.updateProduct(product).subscribe((data) => {
    //   this.products = this.products.map((product) => {
    //     if (product.id === data.id) return data
    //     else return product
    //   })
    // })
  }

  postData(data: PProduct) {
    this.productsService.postProduct(data).subscribe((data) => {
      this.products.push(data)
    })
  }

  updateToBasket(product: PProduct) {
    // product.quantity += 1
    this.productsService.updateProductToBasket(product).subscribe(() => {
    })
  }


  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 200,
    });
  }
}
