import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsListComponent } from './components/clients/clients-list/clients-list.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup/signup.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddressesComponent } from './components/addresses-components/add-addresses/addresses.component';
import { ListAddressesComponent } from './components/addresses-components/list-addresses/list-addresses.component';
import { WrapperAddressesComponent } from './components/addresses-components/wrapper-addresses/wrapper-addresses.component';
import { AddProductsComponent } from './components/products-components/add-products/add-products.component';
import { ListProductsComponent } from './components/products-components/list-products/list-products.component';
import { ListCartComponent } from './components/shopping-cart/list-cart/list-cart.component';
import { OrderPlaceComponent } from './components/order-place/order-place.component';

const routes: Routes = [
  {
    path: 'add-products',
    component:AddProductsComponent
  },
  {
    path: 'place-order',
    component: OrderPlaceComponent
  },
  {
    path:'products',
    component: HomeComponent
  },
  {
    path:'list-cart',
    component: ListCartComponent
  },
  {
    path: 'addresses',
    component: WrapperAddressesComponent
  },
  {path: 'clients',
    component: ClientsListComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path:'clients/edit/:id',
    component: EditClientComponent
  },
  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
