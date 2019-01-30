import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatTableModule,
  MatGridListModule, MatFormFieldModule, MatInputModule,
  MatDialogModule, MatToolbarModule, MatCardModule,
  MatExpansionModule, MatSelectModule, MatDividerModule,
  MatDatepickerModule, MatNativeDateModule, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {DatePipe} from '@angular/common';

import { AppComponent } from './app.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationComponent, ChangeLocationNameDialog } from './location/location.component';
import { from } from 'rxjs';
import { HomepageComponent } from './homepage/homepage.component';
import { SensorsComponent } from './sensors/sensors.component';
import { DataVisualisationComponent } from './data-visualisation/data-visualisation.component';
import { DataAnalysisComponent } from './data-analysis/data-analysis.component';
import { FeedbackComponent } from './feedback/feedback.component';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'locations', component: LocationComponent },
  { path: 'sensors', component: SensorsComponent },
  { path: 'visualisation', component: DataVisualisationComponent },
  { path: 'analysis', component: DataAnalysisComponent },
  { path: 'feedback', component: FeedbackComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TemperatureComponent,
    LocationComponent,
    ChangeLocationNameDialog,
    HomepageComponent,
    SensorsComponent,
    DataVisualisationComponent,
    DataAnalysisComponent,
    FeedbackComponent
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
    MatCardModule,
    MatExpansionModule,
    MatSelectModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
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
