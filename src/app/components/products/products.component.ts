import {Component, OnDestroy, OnInit} from '@angular/core';
import {PProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: PProducts[];
  productsSubscription: Subscription
  canEdit: boolean = false
  canView: boolean = false

  constructor(private ProductsService: ProductsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    //...логика для админа и аторизации
    this.canEdit = true
    this.productsSubscription = this.ProductsService.getProducts()
      .subscribe((data) => {
        this.products = data
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
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = product
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

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
  }

}
