import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isConnected: boolean = false;
  email : string = "";
  password : string = "";

  getIsConnected(){
    return this.isConnected;
  }

  getEmail(){
    return this.email;
  }

  getPassword(){
    return this.password;
  }

  constructor() { }
}
