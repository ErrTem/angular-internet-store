import {Component, OnInit} from "@angular/core";
import {BasketItem, PProduct} from "../../models/products";
import {BehaviorSubject, filter, mapTo, merge, Observable, Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";
import {ResolveEnd, ResolveStart, Router} from "@angular/router";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["../products.component.scss"]
})
export class ProductsComponent implements OnInit {
  constructor(private ProductsService: ProductsService,
              public dialog: MatDialog,
              private router: Router,
              private basketService: BasketService) {
  }

  isLoading!: Observable<boolean>

  products: PProduct[] = []
  products$!: Observable<PProduct[]>

  basket$!: Observable<BasketItem[]>

  canEdit: boolean = false // todo admin logic and authorization
  canView: boolean = false

  private showLoader!: Observable<boolean>
  private hideLoader!: Observable<boolean>

  ngOnInit(): void {

    this.canEdit = true
    this.products$ = this.ProductsService.getProducts()
    this.basket$ = this.basketService.getBasket()

// todo loader doesnt work
    this.hideLoader = this.router.events.pipe(filter((e) => e instanceof ResolveEnd),
      mapTo(false))

    this.showLoader = this.router.events.pipe(filter((e) => e instanceof ResolveStart),
      mapTo(true))

    this.isLoading = merge(this.hideLoader, this.showLoader)
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

  postData(data: PProduct) {
    console.log(data)
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

}
