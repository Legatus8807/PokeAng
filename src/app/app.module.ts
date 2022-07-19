import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InputNameComponent } from './components/input-name/input-name.component';
import { ButtonComponent } from './components/button/button.component';
import { HolderMainComponent } from './components/holder-main/holder-main.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InputNameComponent,
    ButtonComponent,
    HolderMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
