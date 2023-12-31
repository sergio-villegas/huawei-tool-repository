import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { SearchService } from './services/search-data/search.service';
import { GetDataService } from './services/get-data/get-data.service';

import { HttpClientModule } from '@angular/common/http';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { MatCardModule } from '@angular/material/card';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { FormContainerWindowComponent } from './components/form-container-window/form-container-window.component';
import { CreditSectionComponent } from './components/credit-section/credit-section.component';
import { ContainerDetailsDialogComponent } from './components/container-details-dialog/container-details-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConfirmationDialogComponent,
    FormContainerWindowComponent,
    CreditSectionComponent,
    ContainerDetailsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
  ],
  providers: [SearchService, GetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
