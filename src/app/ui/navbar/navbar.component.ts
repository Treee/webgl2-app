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
    this.navbarItems.push({ name: '2D', displayOrder: 1, endpoint: '/2d', isVisible: true });
    this.navbarItems.push({ name: '3D', displayOrder: 2, endpoint: '/3d', isVisible: true });
    this.navbarItems.push({ name: 'Resources', displayOrder: 5, endpoint: '/resources', isVisible: true });
    this.navbarItems.push({ name: 'Fun', displayOrder: 10, endpoint: '/fun', isVisible: true });
  }

}
