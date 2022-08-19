import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app_user';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  tabs = [
    'Create Customer',
    'Create Account',
    'Delete Customer',
    'View Customer',
    'Deposit Amount',
    'Service Charge Deduction',
  ];

  selectedTab: number = 0;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  public get name(): string {
    return this.authService.getName();
  }

  public changeTab(selected: number) {
    this.selectedTab = selected;
  }
}
