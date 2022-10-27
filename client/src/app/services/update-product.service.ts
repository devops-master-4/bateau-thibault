import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdateProductService {

  constructor(private http:HttpClient) { }

  update(data:object,url:string): Observable<string> {

    const options = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    return this.http.post<any>(url, JSON.stringify(data), options);
  }
}
