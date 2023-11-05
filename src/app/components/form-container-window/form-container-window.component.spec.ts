import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContainerWindowComponent } from './form-container-window.component';

describe('FormContainerWindowComponent', () => {
  let component: FormContainerWindowComponent;
  let fixture: ComponentFixture<FormContainerWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormContainerWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormContainerWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
