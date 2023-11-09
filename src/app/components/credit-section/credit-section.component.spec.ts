import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditSectionComponent } from './credit-section.component';

describe('CreditSectionComponent', () => {
  let component: CreditSectionComponent;
  let fixture: ComponentFixture<CreditSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
