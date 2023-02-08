import {Component, OnDestroy, OnInit} from "@angular/core";
import {PProducts} from "../../models/products";
import {filter, mapTo, merge, Observable, Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";
import {ResolveEnd, ResolveStart, Router} from "@angular/router";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["../products.component.scss"]
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(private ProductsService: ProductsService,
              public dialog: MatDialog,
              private router: Router) {
  }

  private showLoader!: Observable<boolean>
  private hideLoader!: Observable<boolean>

  isLoading!: Observable<boolean>

  products: PProducts[]
  productsSubscription: Subscription

  basket: PProducts[]
  basketSubscription: Subscription

  canEdit: boolean = false // логика для админа и авторизации
  canView: boolean = false

  ngOnInit(): void {

    this.canEdit = true
    this.productsSubscription = this.ProductsService.getProducts()
      .subscribe((data) => {
        this.products = data
      });
    this.basketSubscription = this.ProductsService.getProductFromBasket().subscribe((data) => {
      this.basket = data
    })
// loader doesnt work
    this.hideLoader = this.router.events.pipe(filter((e) => e instanceof ResolveEnd),
      mapTo(false))

    this.showLoader = this.router.events.pipe(filter((e) => e instanceof ResolveStart),
      mapTo(true))

    this.isLoading = merge(this.hideLoader, this.showLoader)
  }

  addToBasket(product: PProducts) {
    product.quantity = 1
    let findItem
    if (this.basket.length > 0) {
      findItem = this.basket.find((item) => item.id === product.id)
      if (findItem) {
        this.updateToBasket(findItem)
      } else {
        this.postToBasket(product)
      }
    } else this.postToBasket((product))
  }

  postToBasket(product: PProducts) {
    this.ProductsService.postProductToBasket(product).subscribe((data) => {
      this.basket.push(data)
    })
  }

// лоигака для обновления корзины

  updateToBasket(product: PProducts) {
    product.quantity += 1
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

  openDialog(product?: PProducts): void {
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

  postData(data: PProducts) {
    console.log(data)
    this.ProductsService.postProduct(data).subscribe((data) => {
      this.products.push(data)
    })
  }

  updateData(product: PProducts) {
    this.ProductsService.updateProduct(product).subscribe((data) => {
      this.products = this.products.map((product) => {
        if (product.id === data.id) return data
        else return product
      })
    })
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe()
    if (this.basketSubscription) this.basketSubscription.unsubscribe()

  }

}
