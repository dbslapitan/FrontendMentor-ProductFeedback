import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './pages/authentication/sign-up/sign-up.component';
import { CreateFeedbackComponent } from './pages/create-feedback/create-feedback.component';
import { EditFeedbackComponent } from './pages/edit-feedback/edit-feedback.component';
import { HomeComponent } from './pages/home/home.component';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { IsNotAuthenticatedGuard } from './shared/guards/is-not-authenticated.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', redirectTo: "/", pathMatch: 'full'},
  {path: 'feedback', redirectTo: "/", pathMatch: 'full'},
  {path: 'feedback/create', component: CreateFeedbackComponent, canActivate: [IsAuthenticatedGuard]},
  {path: 'feedback/edit/:id', component: EditFeedbackComponent, canActivate: [IsAuthenticatedGuard]},
  {path: 'signin', component: SignInComponent, canActivate: [IsNotAuthenticatedGuard]},
  {path: 'signup', component: SignUpComponent, canActivate: [IsNotAuthenticatedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
