import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { RouterModule } from '@angular/router';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { AuthService } from './services/auth-service/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { TabHeaderComponent } from './components/tab-header/tab-header.component';
import { CreateAccountComponent } from './components/employee-dashboard/create-account/create-account.component';
import { ServiceChargeDeductionComponent } from './components/employee-dashboard/service-charge-deduction/service-charge-deduction.component';
import { DepositAmountComponent } from './components/employee-dashboard/deposit-amount/deposit-amount.component';
import { ViewCustomerComponent } from './components/employee-dashboard/view-customer/view-customer.component';
import { DeleteCustomerComponent } from './components/employee-dashboard/delete-customer/delete-customer.component';
import { CreateCustomerComponent } from './components/employee-dashboard/create-customer/create-customer.component';
import { WithdrawAmountComponent } from './components/customer-dashboard/withdraw-amount/withdraw-amount.component';
import { TransferAmountComponent } from './components/customer-dashboard/transfer-amount/transfer-amount.component';
import { CustomerDetailsComponent } from './components/customer-dashboard/customer-details/customer-details.component';
import { TransactionDetailsComponent } from './components/customer-dashboard/transaction-details/transaction-details.component';
import { CustomerService } from './services/customer-service/customer.service';
import { TransactionService } from './services/transaction-service/transaction.service';
import { AccountService } from './services/account-service/account.service';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    CustomerDashboardComponent,
    EmployeeDashboardComponent,
    WelcomePageComponent,
    DashboardHeaderComponent,
    CreateCustomerComponent,
    TabHeaderComponent,
    DeleteCustomerComponent,
    CreateAccountComponent,
    ViewCustomerComponent,
    DepositAmountComponent,
    ServiceChargeDeductionComponent,
    WithdrawAmountComponent,
    TransferAmountComponent,
    CustomerDetailsComponent,
    TransactionDetailsComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: WelcomePageComponent },
      { path: 'customerDashboard', component: CustomerDashboardComponent },
      { path: 'employeeDashboard', component: EmployeeDashboardComponent },
      { path: '**', component: PageNotFoundComponent },
    ]),
  ],
  providers: [AuthService, CustomerService, TransactionService, AccountService],
  bootstrap: [AppComponent],
})
export class AppModule {}
