import 'hammerjs';

import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppMaterialModule } from './app.material.module';
import { AppComponent, DialogContentComponent } from './app.component';
import { AppService} from "./app.service";
import { HttpClientModule} from "@angular/common/http";
import { MatTableModule} from "@angular/material";
import { CdkTableModule} from "@angular/cdk/table";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    HttpClientModule,
    MatTableModule,
    CdkTableModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  providers: [AppService],
  declarations: [AppComponent, DialogContentComponent],
  entryComponents: [DialogContentComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
