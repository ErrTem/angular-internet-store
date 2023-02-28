import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./components/products/products.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {BasketComponent} from "./components/basket/basket.component";
import {ProductResolver} from "./services/product.resolver";
import {LoginComponent} from "./components/auth/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {SignUpComponent} from "./components/auth/sign-up/sign-up.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";

const routes: Routes = [
  {path: "products", component: ProductsComponent},
  {path: "products/:id", component: ProductDetailsComponent},
  {
    path: "basket",
    // canActivate: [AuthGuard],
    // canDeactivate: [AuthGuard],
    component: BasketComponent
  },
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignUpComponent},
  {path: "checkout", component: CheckoutComponent},
  {path: '', redirectTo: "products", pathMatch: "full"},
  {path: "**", redirectTo: "products"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
