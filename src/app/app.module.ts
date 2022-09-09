import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import {HttpClientModule} from '@angular/common/http'

import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { RecordComponent } from './components/record/record.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    RecordComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
