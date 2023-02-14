import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./components/products/products.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {BasketComponent} from "./components/basket/basket.component";
import {ProductResolver} from "./services/product.resolver";
import {LoginComponent} from "./components/auth/login/login.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: "products", pathMatch: "full"}, // как задать стартовую страницу которая будет начинаться со /products
  {path: "products", component: ProductsComponent},
  {path: "product/:id", component: ProductDetailsComponent, resolve: {data: ProductResolver}},
  {
    path: "basket",
    // canActivate: [AuthGuard],
    // canDeactivate: [AuthGuard],
    component: BasketComponent
  },
  {path: "login", component: LoginComponent},
  {path: "**", redirectTo: "products"} // как сделать нормально?

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
