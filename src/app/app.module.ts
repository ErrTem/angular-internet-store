import {NgModule} from "@angular/core";
import {NgxsModule} from "@ngxs/store";

import {BrowserModule} from "@angular/platform-browser";

import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeaderComponent} from "./components/UI/header/header.component";
import {FooterComponent} from "./components/UI/footer/footer.component";
import {ProductsComponent} from "./components/products/products.component";
import {BasketComponent} from "./components/basket/basket.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";

import {DialogBoxComponent} from "./components/dialog-box/dialog-box.component";

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import {LoginComponent} from "./components/auth/login/login.component";
import {NotFoundComponent} from "./components/auth/not-found/not-found.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatBadgeModule} from "@angular/material/badge";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SnackBarComponent} from "./components/decorations/snack-bar/snack-bar.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    BasketComponent,
    ProductDetailsComponent,
    DialogBoxComponent,
    LoginComponent,
    NotFoundComponent,
    SnackBarComponent
  ],
  imports: [
    NgxsModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatMenuModule,
    MatSnackBarModule,
    MatProgressBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
