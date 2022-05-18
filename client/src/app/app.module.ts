import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './pages/home/navigation/brand/brand.component';
import { CategoryComponent } from './pages/home/navigation/category/category.component';
import { RoadMapComponent } from './pages/home/navigation/road-map/road-map.component';
import { SortAndFilterComponent } from './pages/home/main/sort-and-filter/sort-and-filter.component';
import { NoFeedbackComponent } from './pages/home/main/no-feedback/no-feedback.component';
import { FeedbackComponent } from './pages/home/main/feedback/feedback.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    CategoryComponent,
    RoadMapComponent,
    SortAndFilterComponent,
    NoFeedbackComponent,
    FeedbackComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
