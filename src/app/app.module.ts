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
import { ShaderProgramService } from './services/shader-program/shader-program.service';
import { TestComponent } from './test/test.component';
import { RendererComponent } from './renderer/renderer.component';
import { TextHelperService } from './services/helpers/text-helper.service';
import { Playground2dComponent } from './ui/playground-2d/playground-2d.component';
import { NavbarComponent } from './ui/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    RendererComponent,
    Playground2dComponent,
    NavbarComponent
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
    MatListModule
  ],
  providers: [
    ShaderProgramService,
    TextHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }