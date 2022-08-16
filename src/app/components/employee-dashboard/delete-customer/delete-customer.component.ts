import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer-service/customer.service';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css'],
})
export class DeleteCustomerComponent implements OnInit {
  message: string | null = null;
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {}

  public onSubmit(form: NgForm) {
    let customerId = form.value['customerId'];

    console.log(customerId);

    this.customerService.deleteCustomer(customerId).subscribe((response) => {
      this.message = response.message;
    });
  }
}
