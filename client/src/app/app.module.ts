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
import { CreateFeedbackComponent } from './pages/create-feedback/create-feedback.component';
import { ToggleOptionsDirective } from './shared/directives/toggle-options.directive';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignInComponent } from './pages/authentication/sign-in/sign-in.component';
import { AuthenticationComponent } from './pages/home/navigation/authentication/authentication.component';
import { SignUpComponent } from './pages/authentication/sign-up/sign-up.component';
import { EditFeedbackComponent } from './pages/edit-feedback/edit-feedback.component';
import { FeedbackDetailComponent } from './pages/feedback-detail/feedback-detail.component';
import { RoadmapPageComponent } from './pages/roadmap-page/roadmap-page.component';
import { CommentComponent } from './pages/feedback-detail/comment/comment.component';
import { ReplyInputDirective } from './shared/directives/reply-input.directive';
import { AuthenticationHeaderInterceptor } from './shared/services/authentication-header.interceptor';

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
    CreateFeedbackComponent,
    ToggleOptionsDirective,
    SignInComponent,
    AuthenticationComponent,
    SignUpComponent,
    EditFeedbackComponent,
    FeedbackDetailComponent,
    RoadmapPageComponent,
    CommentComponent,
    ReplyInputDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FormBuilder,
  {provide: HTTP_INTERCEPTORS, useClass: AuthenticationHeaderInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
