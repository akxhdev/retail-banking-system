import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer-service/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  isError: boolean = false;
  isSuccessfull: boolean = false;
  message: string = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {}

  public onSubmit(form: NgForm) {
    // extract values
    let customerId: string = form.value['customerId'];
    let name: string = form.value['name'];
    let dateOfBirth: string = form.value['dateOfBirth'];
    let pan: string = form.value['pan'];
    let address: string = form.value['address'];
    let password: string = form.value['password'];

    // create customer
    let customer = {
      customerId: customerId,
      name: name,
      dateOfBirth: dateOfBirth,
      pan: pan,
      address: address,
      password: password,
    };

    // call create customer
    this.customerService.createCustomer(customer).subscribe({
      next: (customer) => {
        this.isSuccessfull = true;
        this.message = 'Customer created successfully';
      },
      error: (error) => {
        this.isError = true;
        this.message = 'Error in creating customer';
      },
    });

    // reset form
    this.resetForm(form);
  }

  private resetForm(form: NgForm) {
    setTimeout(() => {
      this.isSuccessfull = false;
      this.isError = false;
      this.message = '';
    }, 2000);

    form.reset();
  }
}
