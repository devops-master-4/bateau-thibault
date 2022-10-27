import {Component, Input, OnInit} from '@angular/core';
import {NavigationExtras, Router, NavigationEnd} from "@angular/router";
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isActive:boolean = false;

  constructor(private router:Router, private loginService : LoginService) {

    
  }
    ngOnInit() {

  }

  goTo(pageName: string): void {
    this.router.navigate(['/' + pageName]);
    this.loginService.email = "";
    this.loginService.password = "";
    this.loginService.isConnected = false;
  }


}
