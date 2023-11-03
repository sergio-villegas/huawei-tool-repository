import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDialogContainerComponent } from './details-dialog-container.component';

describe('DetailsDialogContainerComponent', () => {
  let component: DetailsDialogContainerComponent;
  let fixture: ComponentFixture<DetailsDialogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDialogContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
