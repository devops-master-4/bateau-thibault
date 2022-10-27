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
  messageGlobalUpdate:string ='';
  spinner:boolean = true;
  responseRequest='';


  constructor(public productService : ProductService, private elRef:ElementRef, private http:HttpClient, private updateProductService: UpdateProductService) {
  }

  ngOnInit(): void {
    this.getAllProduits();
  }

  getAllProduits() {
    this.productService.getProductsFromJson().subscribe((res : Product[]) => {
       this.listProduits = res;
        this.filtreProduct= this.listProduits;
        console.log(this.listProduits)
        this.spinner=false;
    },
      (err) => {
        console.log(err);
      });

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
      if($event.target.getAttribute('class').includes('plus')){
        product.sellPrice+=0.5;
      }
      else{
        product.sellPrice-=0.5;
      }

      if((product.sellPrice * (1-product.discount/100)) <= product.price){
        product.sellPrice = product.price;
      }
  }

  onChangeQuantity(product: Product,$event:any) {
      if(!this.checkErreurOnInput($event.target.value, $event.target.id)){
        this.toggleMessageError($event.target);
      }
  }

  checkErreurOnInput(value:string, id:string) :boolean {
    if(!value.match(/^[0-9]+$/)){
      return false;
    }
    else if(id.includes('promotion')){
      if(parseInt(value)> 100){
        return false;
      }
    }
    return true;
  }

  onApplyPromo(product: Product,$event:any){
    if(!this.checkErreurOnInput($event.target.value,'promotion')){
      $event.target.nextElementSibling.classList.remove('hide');
      setTimeout(() =>{
        $event.target.nextElementSibling.classList.add('hide');
      },2000);
      return;
    }
  }

  getSelectedValue(element:any):number | string {
    var text = element.options[element.selectedIndex].value;
    if(text ===''){
      return '';
    }
    return parseInt(text);
  }

  toggleMessageError(element:any):void {
    element.nextElementSibling.classList.remove('hide');
    setTimeout(() =>{
      element.nextElementSibling.classList.add('hide');
    },2000);
  }

  updateProduct(product: Product, $event:any) {

    const selecteurVente = this.elRef.nativeElement.querySelector(`#vente${product.id}`);
    var typeTransaction:number |string =  this.getSelectedValue(selecteurVente);

    let inputAjout = this.elRef.nativeElement.querySelector(`#ajout${product.id}`);
    let inputPromotion = this.elRef.nativeElement.querySelector(`#promotion${product.id}`);


    if(product.quantity_stock <0){
      this.toggleMessageError(inputAjout);
      return;
    }

    if (parseInt(inputAjout.value) > 0 && typeTransaction ==='') {
      this.toggleMessageError(selecteurVente)
      return;
    }
    if(!this.checkErreurOnInput(inputAjout.value,'ajout')){
      this.toggleMessageError(inputAjout);
      return;
    }


    if(this.checkErreurOnInput(inputPromotion.value,'promotion')){
      if( (product.sellPrice * (1-parseInt(inputPromotion.value)/100)) < product.price){
        this.toggleMessageError($event.target);
        this.responseRequest = 'Erreur promotion : le prix ne peut pas etre inférieur au prix d\'achat';
        return;
      }
      product.discount = parseInt(inputPromotion.value);
    }

    switch(typeTransaction) {
      case 0:
        product.quantity_stock -= parseInt(inputAjout.value)
        break;
      case 1:
        product.quantity_stock += parseInt(inputAjout.value)
        break;
      case 2 :
        product.quantity_stock -= parseInt(inputAjout.value)
        break;
    }

    const data = {
      id:product.tig_id,
      name:product.name,
      category: product.category,
      price:product.price,
      unit:product.unit,
      availability : product.availability,
      sale: product.sale,
      discount:product.discount,
      comments : product.comments,
      quantity_stock:product.quantity_stock,
      quantity_sold:product.quantity_sold,
      sellPrice:product.sellPrice,
      typeTransaction:typeTransaction,
      userId:product.userId,
      inputQuantity: parseInt(inputAjout.value)
    }

    //update
    this.updateProductService.update(data,'http://localhost:8000/updateProduct/').subscribe( res=> {
    console.log('sending data');
       if(res=='Succes'){
         this.responseRequest = 'Mis à jour avec succès';
       }
       else{
         this.responseRequest = 'Erreur lors de la mise jour';
       }

       $event.target.nextElementSibling.classList.remove('hide');

       setTimeout(() =>{
         $event.target.nextElementSibling.classList.add('hide');
         this.spinner=true;
         window.location.href =  window.location.href;
       },1000)
    },
    error =>{
      console.log("erreur : ",error)
    });;

  }

  globalUpdate($event:any){

    var arrayOfProducts:any= [];

    this.listProduits.forEach(product => {
      const selecteurVente = this.elRef.nativeElement.querySelector(`#vente${product.id}`);
      var typeTransaction:number |string =  this.getSelectedValue(selecteurVente);

      let inputAjout = this.elRef.nativeElement.querySelector(`#ajout${product.id}`);
      let inputPromotion = this.elRef.nativeElement.querySelector(`#promotion${product.id}`);

        //invalid inputs return
        if( !this.checkErreurOnInput(inputAjout.value, 'ajout') || !this.checkErreurOnInput(inputAjout.value, 'promotion')){
          this.toggleMessageError($event.target);
          this.messageGlobalUpdate = 'Erreur :  valeurs incorrects';
          return;
        }

      if(product.quantity_stock <0){
        this.toggleMessageError(inputAjout);
        setTimeout(() =>{
          product.quantity_stock +=parseInt(inputAjout.value);
        },2000)
        return;
      }

      if (parseInt(inputAjout.value) > 0 && typeTransaction ==='') {
        this.toggleMessageError($event.target);
        this.messageGlobalUpdate = 'Erreur :  le motif de modification de stock ne peut pas être vide';
        return;
      }


      if(this.checkErreurOnInput(inputPromotion.value,'promotion')){
        if( (product.sellPrice * (1-parseInt(inputPromotion.value)/100)) < product.price){
          this.toggleMessageError($event.target);
          return;
        }
        product.discount = parseInt(inputPromotion.value);
      }

      switch(typeTransaction) {
        case 0:
          product.quantity_stock -= parseInt(inputAjout.value)
          break;
        case 1:
          product.quantity_stock += parseInt(inputAjout.value)
          break;
        case 2 :
          product.quantity_stock -= parseInt(inputAjout.value)
          break;
      }

        arrayOfProducts.push({
          id:product.tig_id,
          name:product.name,
          category: product.category,
          price:product.price,
          unit:product.unit,
          availability : product.availability,
          sale: product.sale,
          discount:product.discount,
          comments : product.comments,
          quantity_stock : product.quantity_stock ,
          quantity_sold :  product.quantity_sold ,
          sellPrice:product.sellPrice,
          typeTransaction:typeTransaction,
          userId:product.userId,
          inputQuantity: parseInt(inputAjout.value)
        })

      });

    //update
    this.updateProductService.update(arrayOfProducts,'http://localhost:8000/updateMultipleProduct/').subscribe( res=> {
        console.log('sending data');
        if(res=='Succes'){
          this.spinner=true;
          setTimeout(() =>{
            this.spinner=false;
            this.messageGlobalUpdate = 'Mis à jour avec succès';
            $event.target.nextElementSibling.classList.remove('hide');

            setTimeout(() =>{
              window.location.href =  window.location.href;
            },1000)

          },3000)
        }
        else{
          this.messageGlobalUpdate = 'Erreur lors de la mise jour';
        }
      },
      error =>{
        console.log("erreur : ",error)
      });;

  }

}//end class
