import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatTableModule,
  MatGridListModule, MatFormFieldModule, MatInputModule,
  MatDialogModule, MatToolbarModule, MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {DatePipe} from '@angular/common';

import { AppComponent } from './app.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationComponent, ChangeLocationNameDialog } from './location/location.component';
import { from } from 'rxjs';

const appRoutes: Routes = [
  { path: 'location', component: LocationComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TemperatureComponent,
    LocationComponent,
    ChangeLocationNameDialog
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [
    DatePipe
  ],
  entryComponents: [
    ChangeLocationNameDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
