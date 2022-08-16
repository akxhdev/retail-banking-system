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
  private readonly host = 'http://localhost:8084/account-ms';
  constructor(private http: HttpClient, private authService: AuthService) {}

  // get account
  public getAccount(accountId: string): Observable<Account> {
    // dummy code
    return new Observable<Account>((observer) => {
      let account = new Account(
        '10001452',
        'customer101',
        15000,
        'SAVINGS',
        new Date(),
        'AKSHAY',
        []
      );

      observer.next(account);
    });

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
    // dummy code
    // return new Observable<AccountCreationStatus>((observer) => {
    //   let account = new AccountCreationStatus(
    //     '10001452',
    //     'account created successfully!!'
    //   );

    //   observer.next(account);
    // });

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
}
