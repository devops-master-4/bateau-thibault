import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../interface/product";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-details-produits',
  templateUrl: './details-produits.component.html',
  styleUrls: ['./details-produits.component.css']
})
export class DetailsProduitsComponent implements OnInit {

  product : Product[]=[];
  listProduits: Product[]=[];

  constructor(public productService : ProductService) {

  }

  ngOnInit(): void {
    this.getAllProduits();
  }

  getAllProduits() {
    this.productService.getProductsFromJson().subscribe((res : Product[]) => {
       this.listProduits = res;
        console.log("liste produit : ",this.listProduits );
    },
      (err) => {
        console.log(err);
      });

  }

  getProduit(id: number):Product[] {
    this.product = this.listProduits.filter(product => product.id === id);
    return this.product;
  }


}
