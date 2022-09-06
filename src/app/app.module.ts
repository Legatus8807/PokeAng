import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InputNameComponent } from './components/input-name/input-name.component';
import { ButtonComponent } from './components/button/button.component';
import { HolderMainComponent } from './components/holder-main/holder-main.component';
import { DbButtonComponent } from './components/db-button/db-button.component';
import { UpdateButtonComponent } from './components/update-button/update-button.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InputNameComponent,
    ButtonComponent,
    HolderMainComponent,
    DbButtonComponent,
    UpdateButtonComponent,
    DeleteButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
