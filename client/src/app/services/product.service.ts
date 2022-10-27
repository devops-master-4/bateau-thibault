import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Product} from "../interface/product";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductsFromJson():Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:8000/products/available/")
  }
}
