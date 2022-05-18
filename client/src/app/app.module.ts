import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './navigation/brand/brand.component';
import { CategoryComponent } from './navigation/category/category.component';
import { RoadMapComponent } from './navigation/road-map/road-map.component';
import { SortAndFilterComponent } from './main/feedback-list/sort-and-filter/sort-and-filter.component';
import { NoFeedbackComponent } from './main/feedback-list/no-feedback/no-feedback.component';
import { FeedbackDetailComponent } from './main/feedback-detail/feedback-detail.component';
import { FeedbackCreateComponent } from './main/feedback-create/feedback-create.component';
import { FeedbackEditComponent } from './main/feedback-edit/feedback-edit.component';
import { FeedbackComponent } from './main/feedback-list/feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    CategoryComponent,
    RoadMapComponent,
    SortAndFilterComponent,
    NoFeedbackComponent,
    FeedbackDetailComponent,
    FeedbackCreateComponent,
    FeedbackEditComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
