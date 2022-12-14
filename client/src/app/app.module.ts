import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from "./pages/home/home.component";
import { HeaderComponent } from './features/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './features/footer/footer.component';
import { DetailsProduitsComponent } from './pages/details-produits/details-produits.component';
import { donnesHistoriqueComponent } from './pages/donnees-historique/donnees-historique.component';
import {ProductService} from './services/product.service';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DetailsProduitsComponent,
    donnesHistoriqueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule{}
