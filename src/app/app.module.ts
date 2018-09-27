import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatSliderModule,
  MatDividerModule,
  MatListModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TestComponent } from './test/test.component';
import { Playground2dComponent } from './ui/playground-2d/playground-2d.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { PathFinderComponent } from './ui/path-finder/path-finder.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    Playground2dComponent,
    NavbarComponent,
    PathFinderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
