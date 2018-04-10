import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  navbarItems = [];

  constructor() { }

  ngOnInit() {
    this.navbarItems.push({ name: 'Home', displayOrder: 0, endpoint: '/home', isVisible: true });
    this.navbarItems.push({ name: 'List', displayOrder: 1, endpoint: '/list', isVisible: true });
    this.navbarItems.push({ name: 'Compare', displayOrder: 2, endpoint: '/compare', isVisible: true });
    this.navbarItems.push({ name: 'Search', displayOrder: 5, endpoint: '/search', isVisible: false });
    this.navbarItems.push({ name: 'My Account', displayOrder: 10, endpoint: '/myaccount', isVisible: false });
  }

}
