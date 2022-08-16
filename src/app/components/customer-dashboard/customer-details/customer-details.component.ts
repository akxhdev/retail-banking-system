import { Attribute, Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer-service/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  @Input() customer: Customer | null = null;
  @Input() refresh: Function | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    if (this.refresh == null) return;

    // refresh data
    this.refresh();
  }
}
