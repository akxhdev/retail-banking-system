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
  private host: string = 'http://ec2-3-80-244-130.compute-1.amazonaws.com:8083/customer-ms';
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
    return this.http.post<Customer>(this.host + '/createCustomer/', customer, {
      headers: this.authService.getHeader(),
    });
  }

  // get customer details
  public getCustomer(customerId: string): Observable<Customer> {
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
