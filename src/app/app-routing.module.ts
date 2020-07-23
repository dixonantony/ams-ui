import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { RouteGuardService } from './service/route-guard.service';
import { UserComponent } from './user/user.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ListAccountsComponent } from './list-accounts/list-accounts.component';
import { AccountComponent } from './account/account.component';


const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'welcome/:name', component: WelcomeComponent, canActivate:[RouteGuardService]},
  {path:'user/:username/:parent', component: UserComponent, canActivate:[RouteGuardService]},
  {path:'privacy', component: PrivacyComponent, canActivate:[RouteGuardService]},
  {path:'terms', component: TermsComponent, canActivate:[RouteGuardService]},
  {path:'list-users', component: ListUsersComponent, canActivate:[RouteGuardService]},
  {path:'account/:accountcd', component: AccountComponent, canActivate:[RouteGuardService]},
  {path:'list-accounts', component: ListAccountsComponent, canActivate:[RouteGuardService]},
  {path:'**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
