import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup/signup.component';
import { ClientsListComponent } from './components/clients/clients-list/clients-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { AddressesComponent } from './components/addresses-components/add-addresses/addresses.component';
import { ListAddressesComponent } from './components/addresses-components/list-addresses/list-addresses.component';
import { WrapperAddressesComponent } from './components/addresses-components/wrapper-addresses/wrapper-addresses.component';
import { AddProductsComponent } from './components/products-components/add-products/add-products.component';
import { ListProductsComponent } from './components/products-components/list-products/list-products.component';
import { ListCartComponent } from './components/shopping-cart/list-cart/list-cart.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryDropdownComponent } from './components/category-dropdown/category-dropdown.component';
import { OrderPlaceComponent } from './components/order-place/order-place.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ClientsListComponent,
    EditClientComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    AddressesComponent,
    ListAddressesComponent,
    WrapperAddressesComponent,
    AddProductsComponent,
    ListProductsComponent,
    ListCartComponent,
    CategoryComponent,
    CategoryDropdownComponent,
    OrderPlaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
