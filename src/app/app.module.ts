import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShaderProgramServiceService } from './services/shader-program/shader-program-service.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ShaderProgramServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
