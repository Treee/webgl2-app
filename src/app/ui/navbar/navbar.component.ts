import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';


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
    this.navbarItems.push({ name: 'Home', displayOrder: 0, endpoint: '/', isVisible: true });
    this.navbarItems.push({ name: '2D', displayOrder: 1, endpoint: '/2d', isVisible: true });
    this.navbarItems.push({ name: 'Path Finder', displayOrder: 5, endpoint: '/pathfinder', isVisible: true });
  }
}
