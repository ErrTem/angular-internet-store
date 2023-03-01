import {Component, OnDestroy, OnInit, ViewEncapsulation} from "@angular/core";
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
export class ProductsComponent implements OnInit, OnDestroy {
  durationInSeconds = 5

  products: PProduct[] = []
  products$!: Observable<PProduct[]>

  basket$!: Observable<BasketItem[]>

  canEdit: boolean = false // todo admin logic and authorization
  canView: boolean = false

  constructor(private productsService: ProductsService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private basketService: BasketService,
              private snackBar: MatSnackBar) {
  }

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
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig)
    dialogConfig.width = "500px"
    dialogConfig.disableClose = true
    dialogConfig.data = product
    dialogRef.afterClosed().subscribe((data) => {
      if (!data.id) {
        data.id = Date.now()
        this.postData(data)
      } else
        this.updateData(data)
    })
  }

  updateData(product: PProduct) {
    this.products$ = this.productsService.updateProduct(product)
      .pipe(
        switchMap(() => this.productsService.getProducts())
      )
  }

  postData(product: PProduct) {
    this.products$ = this.productsService.postProduct(product)
      .pipe(
        switchMap(() => this.productsService.getProducts())
      )
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 200,
    });
  }

  public ngOnDestroy(): void {
    // todo зачем отписываться от products$
  }

  //todo подгрузка товаров
}
