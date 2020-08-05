import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthInterceptorService } from './service/http/http-auth-interceptor.service';
import { UserComponent } from './user/user.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import { ListAccountsComponent } from './list-accounts/list-accounts.component';
import { AccountComponent } from './account/account.component';
import { ListTransCategoryComponent } from './list-trans-category/list-trans-category.component';
import { TransCategoryComponent } from './trans-category/trans-category.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ListTransactionsComponent } from './list-transactions/list-transactions.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSliderModule} from '@angular/material/slider';
import { DatePipe } from '@angular/common';
import { TransCategoryReportComponent } from './trans-category-report/trans-category-report.component';
import { TransSubCategoryReportComponent } from './trans-sub-category-report/trans-sub-category-report.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ExcelService } from './service/common/excel.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    UserComponent,
    PrivacyComponent,
    TermsComponent,
    ListUsersComponent,
    ListAccountsComponent,
    AccountComponent,
    ListTransCategoryComponent,
    TransCategoryComponent,
    ConfirmDeleteDialogComponent,
    TransactionsComponent,
    ListTransactionsComponent,
    TransCategoryReportComponent,
    TransSubCategoryReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatSliderModule,
    MatTooltipModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS,useClass:HttpAuthInterceptorService, multi:true},
    {provide : DatePipe},
    {provide : ExcelService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
