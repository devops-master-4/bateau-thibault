import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Product} from "../../interface/product";
import {ProductService} from "../../services/product.service";
import {HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import {UpdateProductService} from "../../services/update-product.service";
@Component({
  selector: 'app-details-produits',
  templateUrl: './details-produits.component.html',
  styleUrls: ['./details-produits.component.css']
})
export class DetailsProduitsComponent implements OnInit {

  listProduits: Product[]=[];
  filtreProduct = this.listProduits;
  categorieName:string ='Tout les produits de la mer';


  constructor(public productService : ProductService, private elRef:ElementRef, private http:HttpClient, private updateProductService: UpdateProductService) {}

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


  getPourcentageSold(prix:number, price_sold:number):string {
    if(price_sold === prix){
      return '';
    }
   return '( '+ Math.round((price_sold-prix)/price_sold * 100)+'%)';
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
      return this.filtreProduct = this.listProduits;
    }
  }

  changePrice(product: Product, $event: any) {
    product.price = $event.target.value;
    console.log("prix : ",product.price);
  }

  onChangeQuantity(product: Product,$event:any) {
    let value:string = $event.target.value;
      if(!value.match(/^[0-9]+$/)){
        $event.target.nextElementSibling.classList.remove('hide');
        setTimeout(() =>{
          $event.target.nextElementSibling.classList.add('hide');
        },2000);
        return;
      }
  }

  onApplyPromo(product: Product,$event:any){
    let value:string = $event.target.value;
    if(!value.match(/^[0-9]+$/) || parseInt(value) > 100){
      $event.target.nextElementSibling.classList.remove('hide');
      setTimeout(() =>{
        $event.target.nextElementSibling.classList.add('hide');
      },2000);
      return;
    }
  }

  getSelectedValue(element:any):number | undefined {

    var text = element.options[element.selectedIndex].value;
    if(text ===''){
      return undefined;
    }

    return parseInt(text);

  }

  updateProduct(product: Product) {

    const selecteurVente = this.elRef.nativeElement.querySelector(`#vente${product.id}`);
    let optionVente = this.getSelectedValue(selecteurVente);

    let inputAjout = this.elRef.nativeElement.querySelector(`#ajout${product.id}`).value;
    let inputRetrait = this.elRef.nativeElement.querySelector(`#retrait${product.id}`).value;
    let inputPromotion = this.elRef.nativeElement.querySelector(`#promotion${product.id}`).value;

    if (inputRetrait > 0 && optionVente == undefined) {
      selecteurVente.nextElementSibling.classList.remove('hide');

      setTimeout(() => {
        selecteurVente.nextElementSibling.classList.add('hide');
      }, 2000);

      return;
    }

    //check if all input equals 0 or promotion >0 return void
    if ((parseInt(inputAjout) == 0 && parseInt(inputRetrait) == 0 && (parseInt(inputPromotion) == 0 || parseInt(inputPromotion) > 100))) {
      return;
    }


    product.quantity_stock -= parseInt(inputRetrait);
    product.quantity_stock += parseInt(inputAjout);


    if (product.quantity_sold != 0) {
      product.quantity_sold += parseInt(inputRetrait);
    }
    if (product.quantity_stock <= 0) {
      product.quantity_stock = 0;
    }
    console.log(product.quantity_stock);

    //declare  data
    const data = {

    };

    //update stock quantity

    this.updateProductService.update(data,'http://51.255.166.155:1352/tig/products/');

  }

}//end class
