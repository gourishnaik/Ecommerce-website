import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component'
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import {SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerupdateComponent } from './sellerupdate/sellerupdate.component';
import { SuccessOrderComponent } from './success-order/success-order.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
const routes: Routes = [
 
  {path:'',component:HomeComponent},
  {path:'sellerauth',component:SellerAuthComponent},
  {path:'login',component:LoginComponent},
  {path:'user-auth',component:UserAuthComponent},
  {path:'cart-page',component:CartPageComponent},
  {path:'checkout-page',component:CheckoutComponent},
  {path:'my-orders',component:MyOrdersComponent},
  {path:'success-order',component:SuccessOrderComponent},
  {path:'sellerupdate/:id',component:SellerupdateComponent},
  {path:'search/:query',component:SearchComponent}, /// for search term
  {path:'details/:productid',component:ProductDetailsComponent},
  {path:'sellerhome',component:SellerHomeComponent,canActivate:[AuthGuard]},
  {path:'selleradd',component:SellerAddProductComponent,canActivate:[AuthGuard]},
  {path:'**',component:PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
