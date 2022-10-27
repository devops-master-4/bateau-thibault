import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import { from } from 'rxjs';

@Component({
  selector: 'app-item-nav',
  templateUrl: './item-nav.component.html',
  styleUrls: ['./item-nav.component.css']
})
export class ItemNavComponent implements OnInit {

  @Input() selected:string='';
  @Input() isActive:boolean=false;

  constructor(private router:Router, isActive:boolean, selected:string) {
    this.isActive = isActive;
    this.selected = selected;
  }

  ngOnInit() {
    this.isActive !== undefined ? this.isActive : '';
    this.selected !== undefined ? this.selected : 'home';
  }

  goTo(pageName:string) {
    console.log(pageName)
    this.setItemACtive();
  }

  setItemACtive(){
    return this.isActive =  !this.isActive;
  }

}
