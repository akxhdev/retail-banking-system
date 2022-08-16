import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceChargeDeductionComponent } from './service-charge-deduction.component';

describe('ServiceChargeDeductionComponent', () => {
  let component: ServiceChargeDeductionComponent;
  let fixture: ComponentFixture<ServiceChargeDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceChargeDeductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceChargeDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
