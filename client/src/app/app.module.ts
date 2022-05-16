import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './navigation/brand/brand.component';
import { CategoryComponent } from './navigation/category/category.component';
import { RoadMapComponent } from './navigation/road-map/road-map.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    CategoryComponent,
    RoadMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
