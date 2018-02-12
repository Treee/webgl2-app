import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShaderProgramService } from './services/shader-program/shader-program.service';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ShaderProgramService],
  bootstrap: [AppComponent]
})
export class AppModule { }
