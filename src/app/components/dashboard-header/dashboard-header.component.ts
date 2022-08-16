import { Attribute, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css'],
})
export class DashboardHeaderComponent implements OnInit {
  name: string;
  constructor(
    @Attribute('role') public role: string,
    private authService: AuthService
  ) {
    this.name = authService.getName();
  }

  public getTitle(): string {
    return 'Welcome, ' + this.name;
  }

  public getSubtitle(): string {
    return (this.role === 'employee' ? 'Employee' : 'Customer').toUpperCase();
  }

  ngOnInit(): void {}

  public logout() {
    this.authService.logout();
  }
}
