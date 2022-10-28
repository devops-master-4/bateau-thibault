import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Product } from "../../interface/product";
import { ProductService } from "../../services/product.service";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { UpdateProductService } from "../../services/update-product.service";
@Component({
  selector: 'app-details-produits',
  templateUrl: './details-produits.component.html',
  styleUrls: ['./details-produits.component.css']
})
export class DetailsProduitsComponent implements OnInit {

  listProduits: Product[] = [];
  filtreProduct = this.listProduits;
  categorieName: string = 'Tout les produits de la mer';
  success: string = '';
  spinner: boolean = true;
  responseRequest = '';
  messageGlobalUpdate = '';


  constructor(public productService: ProductService, private elRef: ElementRef, private http: HttpClient, private updateProductService: UpdateProductService) {
  }

  ngOnInit(): void {
    this.getAllProduits();
  }

  getAllProduits() {
    this.productService.getProductsFromJson().subscribe((res: Product[]) => {
      this.listProduits = res;
      this.filtreProduct = this.listProduits;
      console.log(this.listProduits)
      this.spinner = false;
    },
      (err) => {
        console.log(err);
      });

  }


  onChange(event: any): Product[] {

    switch (event.target.value) {
      case '0':
        this.categorieName = 'Tout les Poissons'
        break;
      case '1':
        this.categorieName = 'Tout les Coquillages'
        break;
      case '2':
        this.categorieName = 'Tout les Crustacés'
        break;
      case '':
        this.categorieName = 'Tout les produits de la mer';
    }

    if (event.target.value !== '') {
      return this.filtreProduct = this.listProduits.filter(product => product.category == event.target.value);
    }
    else {
      return this.filtreProduct = this.listProduits;
    }
  }


  changePrice(product: Product, $event: any) {
    console.log('changePrice', product.sellPrice);

    if ($event.target.getAttribute('class').includes('plus')) {
      product.sellPrice += 0.5;
    }
    else {
      product.sellPrice -= 0.5;
    }
    if (product.sellPrice <= product.price) { product.sellPrice = product.price; }
  }

  onChangeQuantity(product: Product, $event: any) {
    if (!this.checkErreurOnInput($event.target.value, $event.target.id)) {
      $event.target.nextElementSibling.classList.remove('hide');
      setTimeout(() => {
        $event.target.nextElementSibling.classList.add('hide');
      }, 2000);
      return;
    }
  }

  checkErreurOnInput(value: string, id: string): boolean {
    if (!value.match(/^[0-9]+$/)) {
      return false;
    }
    else if (id.includes('promotion')) {
      if (parseInt(value) > 100) {
        return false;
      }
    }
    return true;
  }

  onApplyPromo(product: Product, $event: any) {

    if (!this.checkErreurOnInput($event.target.value, $event.target.id)) {
      $event.target.nextElementSibling.classList.remove('hide');
      setTimeout(() => {
        $event.target.nextElementSibling.classList.add('hide');
      }, 2000);
      return;
    }
  }

  getSelectedValue(element: any): number | string {

    var text = element.options[element.selectedIndex].value;
    if (text === '') {
      return "";
    }

    return parseInt(text);

  }

  toggleMessageError(element:any):void {
    element.nextElementSibling.classList.remove('hide');
    setTimeout(() =>{
      element.nextElementSibling.classList.add('hide');
    },2000);
  }

  //create data model for product to update if  error return null
  getProduct(product: Product, $event:any): object | null{
    const selecteurVente = this.elRef.nativeElement.querySelector(`#vente${product.id}`);
    let typeTransaction : string | number = this.getSelectedValue(selecteurVente);

    let inputAjout = this.elRef.nativeElement.querySelector(`#ajout${product.id}`);
    let inputPromotion = this.elRef.nativeElement.querySelector(`#promotion${product.id}`);

    console.log(inputAjout.value, typeTransaction);
    if (parseInt(inputAjout.value) > 0 && typeTransaction == 0) {
      this.toggleMessageError(selecteurVente)
      return null;
    }


    if(!this.checkErreurOnInput(inputAjout.value,'ajout')){
      this.toggleMessageError(inputAjout);
      return null;
    }

    if(this.checkErreurOnInput(inputPromotion.value,'promotion')){
      if( (product.sellPrice * (1-parseInt(inputPromotion.value)/100)) < product.price){
        this.toggleMessageError($event.target);
        this.responseRequest = 'Erreur promotion : le prix ne peut pas etre inférieur au prix d\'achat';
        return null;
      }
      product.discount = parseInt(inputPromotion.value);
    }

    switch (typeTransaction) {
      case 1:
        typeTransaction = 1;
        product.quantity_stock -= parseInt(inputAjout.value)
        break;
      case 2:
        typeTransaction = 2;
        product.quantity_stock += parseInt(inputAjout.value)
        break;
      case 3:
        typeTransaction = 3;
        product.quantity_stock -= parseInt(inputAjout.value)
        break;

      default:
        typeTransaction = 0;
    }

    if(product.quantity_stock <0){
      this.toggleMessageError($event.target);
      this.responseRequest = "Erreur stock";
      product.quantity_stock += parseInt(inputAjout.value)
      return null;
    }

    const data = {
      id: product.tig_id,
      name: product.name,
      category: product.category,
      price: product.price,
      unit: product.unit,
      availability: product.availability,
      sale: product.sale,
      discount: product.discount,
      comments: product.comments,
      quantity_stock: product.quantity_stock,
      quantity_sold: product.quantity_sold,
      sellPrice: product.sellPrice,
      typeTransaction: typeTransaction,
      userId: product.userId,
      inputQuantity: parseInt(inputAjout.value)
    }

    return data;

  }

  updateProduct(product: Product, $event: any) {

   var data = this.getProduct(product, $event);

   if(data == null){
     return;
   }

    //update stock quantity
    this.updateProductService.update(data, 'http://localhost:8000/updateProduct/').subscribe(res => {

      if (res == 'Succes') {
        this.responseRequest = 'Mis à jour avec succès';
      }
      else {
        this.responseRequest = 'Erreur lors de la mise jour';
      }

      $event.target.nextElementSibling.classList.remove('hide');

      setTimeout(() => {
        $event.target.nextElementSibling.classList.add('hide');
        //window.location.href =  window.location.href;
      }, 1000)
    },
      error => {
        console.log("erreur : ", error)
      });

  }



  globalUpdate($event:any){

    var arrayOfProducts:any= [];

    this.listProduits.forEach(product => {

        var data = this.getProduct(product, $event);

        if(data != null){
          arrayOfProducts.push(data);
        }
    });

    //update
    console.log(arrayOfProducts);

    if(arrayOfProducts.length > 0){
      this.spinner=true;
      this.updateProductService.update(arrayOfProducts,'http://localhost:8000/updateMultipleProduct/').subscribe( res=> {
          console.log('sending data');
          if(res=='Succes'){
            setTimeout(() =>{
              this.spinner=false;
              this.messageGlobalUpdate = 'Mis à jour avec succès';
              $event.target.nextElementSibling.classList.remove('hide');

              setTimeout(() =>{
                window.location.href =  window.location.href;
              },1000)

            },3000)
          }
        },
        error =>{
          console.log("erreur : ",error)
            $event.target.nextElementSibling.classList.remove('hide');
            this.messageGlobalUpdate = 'Erreur lors de la mise jour';
        });;
    }
  }

}//end class
