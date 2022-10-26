import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  login(){
    const email = document.getElementById('inputEmail') as HTMLInputElement;
    const password = document.getElementById('inputPassword') as HTMLInputElement;
    console.log(email.value);
    console.log(password.value);
    if(!email.value || !password.value){
      alert('Veuillez remplir tous les champs');
    }
  }

}
