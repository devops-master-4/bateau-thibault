import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../interface/product";

@Injectable({
  providedIn: 'root'
})
export class UpdateProductService {

  constructor(private http:HttpClient) { }

  update(data:object,url:string):void {

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    };

    this.http.post<any>(url, JSON.stringify(data), options).subscribe( res=> {
        (t: any) => console.info(JSON.stringify(t))
        console.log(res);
      },
      error =>{
        console.log("erreur : ",error)
      });
  }
}
