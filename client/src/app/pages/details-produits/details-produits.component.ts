import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../interface/product";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-details-produits',
  templateUrl: './details-produits.component.html',
  styleUrls: ['./details-produits.component.css']
})
export class DetailsProduitsComponent implements OnInit {

  listProduits: Product[]=[];
  filtreProduct = this.listProduits;
  categorieName:string ='Tout les produits de la mer';
  price_on_sold:string = '';

  constructor(public productService : ProductService) {}

  ngOnInit(): void {
    this.getAllProduits();
  }

  getAllProduits() {
    this.productService.getProductsFromJson().subscribe((res : Product[]) => {
       this.listProduits = res;
        this.filtreProduct= this.listProduits;
    },
      (err) => {
        console.log(err);
      });

  }

  getProduit(id: number) {

  }

  getPourcentageSold(prix:number, price_sold:number):string {
    if(price_sold === prix){
      return '';
    }
   return '( '+ Math.round((prix-price_sold)/prix * 100)+'%)';
  }

  onChange(event:any):Product[]{

    switch(event.target.value){
      case '0':
        this.categorieName='Tout les Poissons'
        break;
      case '1':
        this.categorieName='Tout les Coquillages'
        break;
      case '2':
        this.categorieName='Tout les Crustacés'
        break;
      case '':
        this.categorieName='Tout les produits de la mer';
    }

    if(event.target.value !==''){
      return this.filtreProduct = this.listProduits.filter(product => product.category ==event.target.value);
    }
    else{
      return this.filtreProduct=this.listProduits;
    }
  }

}//end class
