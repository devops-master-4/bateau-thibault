import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    const emailRegex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    const passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    const email = document.getElementById('inputEmail') as HTMLInputElement;
    const password = document.getElementById('inputPassword') as HTMLInputElement;
    console.log(email.value);
    console.log(password.value);
    /*
    if(!email.value || !password.value){
      alert('Veuillez remplir tous les champs');
    }
    else if(!emailRegex.test(email.value)){
      alert('Veuillez entrer une adresse mail valide')
    }
    else if(!passwordRegex.test(password.value)){
      alert('Votre mot de passe doit contenir au moins 8 caractères dont une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.');
    }
    else{
      //Si la connection est valide
      this.loginVerification(email.value, password.value);
    }*/
  }

  loginVerification(email : string, password : string){
    this.router.navigate(["/home"]);
  }

}
