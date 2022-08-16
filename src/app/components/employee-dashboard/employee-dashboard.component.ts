import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app_user';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  selectedTab: number = 5;

  constructor() {}

  ngOnInit(): void {}

  public changeTab(selected: number) {
    this.selectedTab = selected;
  }
}
