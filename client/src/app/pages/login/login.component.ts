import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    const emailRegex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    const passwordRegex = new RegExp(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
    );
    const email = document.getElementById('inputEmail') as HTMLInputElement;
    const password = document.getElementById(
      'inputPassword'
    ) as HTMLInputElement;
    console.log(email.value);
    console.log(password.value);
    if (!email.value || !password.value) {
      alert('Veuillez remplir tous les champs');
    } else {
      //make a request to the server to verify the user with the email and password provided fetch
      fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      }).then((response) => {
        if (response.status === 200) {
          //save the token in the local storage
          response.json().then((data) => {
            console.log(data);
            // await to save the token in the local storage
            localStorage.setItem('token', data.jwt);
            this.router.navigate(['/home']);

          });
          
        } else {
          alert('Email ou mot de passe incorrect');
        }
      }).catch((error) => {
        console.log(error);
      });
      }
    }
  }


