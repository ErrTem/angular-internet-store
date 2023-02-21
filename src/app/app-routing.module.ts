import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./components/products/products.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {BasketComponent} from "./components/basket/basket.component";
import {ProductResolver} from "./services/product.resolver";
import {LoginComponent} from "./components/auth/login/login.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: "products", pathMatch: "full"},
  {path: "products", component: ProductsComponent},
  {path: "products/:id", component: ProductDetailsComponent},
  {
    path: "basket",
    // canActivate: [AuthGuard],
    // canDeactivate: [AuthGuard],
    component: BasketComponent
  },
  {path: "login", component: LoginComponent},
  {path: "**", redirectTo: "products"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
