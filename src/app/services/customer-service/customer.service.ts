import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/models/account';
import { Customer } from 'src/app/models/customer';
import { MessageDetails } from 'src/app/models/message_details';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private host: string = 'http://localhost:8083/customer-ms';
  constructor(private http: HttpClient, private authService: AuthService) {}

  // create customer
  public createCustomer(customer: {
    customerId: string;
    name: string;
    dateOfBirth: string;
    pan: string;
    address: string;
    password: string;
  }): Observable<Customer> {
    // dummy code
    // return new Observable<Customer>((observer) => {
    //   let account = new Customer(
    //     'customee101',
    //     'AKSHAY',
    //     'customer',
    //     'LYQPS4005Q',
    //     '25 LIG'
    //   );

    //   observer.next(account);
    // });

    return this.http.post<Customer>(this.host + '/createCustomer/', customer, {
      headers: this.authService.getHeader(),
    });
  }

  // get customer details
  public getCustomer(customerId: string): Observable<Customer> {
    // dummy code
    // return new Observable<Customer>((observer) => {
    //   let account = new Customer(
    //     '15082022',
    //     'AKSHAY',
    //     '2001-04-21',
    //     'LYQPS4005Q',
    //     '25 LIG',
    //     [
    //       new Account(
    //         '20020203',
    //         '15082022',
    //         15000,
    //         'SAVINGS',
    //         new Date(),
    //         'AKSHAY',
    //         []
    //       ),
    //       new Account(
    //         '20020204',
    //         '15082022',
    //         10000,
    //         'CURRENT',
    //         new Date(),
    //         'AKSHAY',
    //         []
    //       ),
    //     ]
    //   );

    //   observer.next(account);
    // });

    return this.http.get<Customer>(
      this.host + '/getCustomerDetails/' + customerId,
      {
        headers: this.authService.getHeader(),
      }
    );
  }

  // delete customer
  public deleteCustomer(customerId: string): Observable<MessageDetails> {
    return this.http.delete<MessageDetails>(
      this.host + '/deleteCustomer/' + customerId,
      {
        headers: this.authService.getHeader(),
      }
    );
  }
}
