// AngularIO Imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Angular Material Imports
import {
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatSliderModule,
  MatDividerModule,
  MatListModule,
  MatInputModule,
  MatSlideToggleModule
} from '@angular/material';

// NG Bootstrap Import
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TestComponent } from './test/test.component';
import { Playground2dComponent } from './ui/playground-2d/playground-2d.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { PathFinderComponent } from './ui/path-finder/path-finder.component';
import { PathCellComponent } from './ui/path-finder/path-cell/path-cell.component';

// Services
import { ErrorHandlerService } from './services/error-handler/error-handler.service';
import { MessageToasterComponent } from './ui/message-toaster/message-toaster.component';
import { RtsMapComponent } from './ui/playground-2d/rts-map/rts-map.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    Playground2dComponent,
    NavbarComponent,
    PathFinderComponent,
    PathCellComponent,
    MessageToasterComponent,
    RtsMapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatSlideToggleModule,
    AppRoutingModule
  ],
  providers: [
    ErrorHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
