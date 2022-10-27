import {Component, Input, OnInit} from '@angular/core';
import {NavigationExtras, Router, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isActive:boolean = false;

  constructor(private router:Router) {

    
  }
    ngOnInit() {

  }

  goTo(pageName: string): void {
    this.router.navigate(['/' + pageName]);
  }

  logout() {

    this.router.navigate(['login/']);
    localStorage.removeItem('token');
  }


}
