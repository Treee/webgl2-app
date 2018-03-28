import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShaderProgramService } from './services/shader-program/shader-program.service';
import { TestComponent } from './test/test.component';
import { RendererComponent } from './renderer/renderer.component';
import { TextHelperService } from './services/helpers/text-helper.service';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    RendererComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    ShaderProgramService,
    TextHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
