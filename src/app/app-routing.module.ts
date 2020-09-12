import { NgModule} from '@angular/core';
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
import { ListTransCategoryComponent } from './list-trans-category/list-trans-category.component';
import { TransCategoryComponent } from './trans-category/trans-category.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ListTransactionsComponent } from './list-transactions/list-transactions.component';
import { TransCategoryReportComponent } from './trans-category-report/trans-category-report.component';
import { TransSubCategoryReportComponent } from './trans-sub-category-report/trans-sub-category-report.component';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { RoleComponent } from './role/role.component';


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
  {path:'trans-category/:transCategoryCd', component: TransCategoryComponent, canActivate:[RouteGuardService]},
  {path:'list-trans-category', component: ListTransCategoryComponent, canActivate:[RouteGuardService]},
  {path:'daily-expense/:expenseid', component: TransactionsComponent, canActivate:[RouteGuardService]},
  {path:'transactions-report', component: ListTransactionsComponent, canActivate:[RouteGuardService]},
  {path:'trans-summary-report', component: TransCategoryReportComponent, canActivate:[RouteGuardService]},
  {path:'trans-detail-report', component: TransSubCategoryReportComponent, canActivate:[RouteGuardService]},
  {path:'list-roles', component: ListRolesComponent, canActivate:[RouteGuardService]},
  {path:'role/:rolecode', component: RoleComponent, canActivate:[RouteGuardService]},
  {path:'**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
