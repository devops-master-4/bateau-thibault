import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isActive: boolean = false;

  constructor(private router: Router) {}
  ngOnInit() {
    this.isConnected();
  }

  goTo(pageName: string): void {
    this.router.navigate(['/' + pageName]);
  }

  logout() {
    this.router.navigate(['login/']);
    localStorage.removeItem('token');
  }

  isConnected() {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:8000/isConnected/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
        }),
      })
        .then((response) => {
          console.log('response', response);
          response.json().then((data) => {
            console.log('data', data.id);
            if (data.id !== undefined) {
              this.isActive = true;
              console.log('this.isActive', this.isActive);
            } else {
              this.router.navigate(['login/']);
            }
          });
        })
        .catch((error) => {
          console.log(error);
          this.router.navigate(['login/']);
        });
    } else {
      this.router.navigate(['login/']);
    }
  }
}
