import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsProduitsComponent } from './pages/details-produits/details-produits.component';
import {HomeComponent} from "./pages/home/home.component";
import {donnesHistoriqueComponent} from "./pages/donnees-historique/donnees-historique.component";
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component:HomeComponent},
  { path: 'detailsProduit', component:DetailsProduitsComponent},
  { path: 'donnesHistorique', component:donnesHistoriqueComponent},
  { path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
