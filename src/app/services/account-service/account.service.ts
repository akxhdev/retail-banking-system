import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/models/account';
import { AccountCreationStatus } from 'src/app/models/account_creation_status';
import { MessageDetails } from 'src/app/models/message_details';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly host = 'http://ec2-52-90-72-28.compute-1.amazonaws.com:8084/account-ms';
  constructor(private http: HttpClient, private authService: AuthService) {}

  // get account
  public getAccount(accountId: string): Observable<Account> {
    return this.http.get<Account>(this.host + '/getAccount/' + accountId, {
      headers: this.authService.getHeader(),
    });
  }

  // create account
  public createAccount(
    customerId: string,
    account: {
      customerId: string;
      currentBalance: number;
      accountType: string;
      openingDate: Date;
      ownerName: string;
    }
  ): Observable<AccountCreationStatus> {
    return this.http.post<AccountCreationStatus>(
      this.host + '/createAccount/' + customerId,
      account,
      {
        headers: this.authService.getHeader(),
      }
    );
  }

  // deposit
  public deposit(accountInput: {
    accountId: string;
    amount: number;
  }): Observable<Account> {
    return this.http.post<Account>(this.host + '/deposit', accountInput, {
      headers: this.authService.getHeader(),
    });
  }

  // withdraw
  public withdraw(accountInput: {
    accountId: string;
    amount: number;
  }): Observable<Account> {
    return this.http.post<Account>(this.host + '/withdraw', accountInput, {
      headers: this.authService.getHeader(),
    });
  }

  // tranfer
  public transfer(transferInput: {
    sourceAccount: {
      accountId: string;
      amount: number;
    };
    targetAccount: {
      accountId: string;
      amount: number;
    };
    amount: number;
    reference: string;
  }): Observable<MessageDetails> {
    return this.http.post<MessageDetails>(
      this.host + '/transaction',
      transferInput,
      {
        headers: this.authService.getHeader(),
      }
    );
  }

  // deduct service charge
  public deductServiceCharge(): Observable<Account[]> {
    return this.http.post<Account[]>(
      'http://localhost:8086/rules-ms/serviceCharges',
      null,
      {
        headers: this.authService.getHeader(),
      }
    );
  }
}
