import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Container } from './container.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'My App Title';
  
  containers: Container[] = [
    {
      elementName: 'Sample Container 1',
      user: 'sampleUser1',
      date: new Date('2023-11-02'),
      workArea: 'Sample Work Area 1'
    },
    {
      elementName: 'Sample Container 2',
      user: 'sampleUser2',
      date: new Date('2023-11-03'),
      workArea: 'Sample Work Area 2'
    },
    {
      elementName: 'Sample Container 3',
      user: 'sampleUser3',
      date: new Date('2023-11-04'),
      workArea: 'Sample Work Area 3'
    }
  ];

  containerForm: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.containerForm = this.fb.group({
      elementName: ['', Validators.required],
      user: ['', Validators.required],
      date: [new Date(), Validators.required],
      workArea: ['', Validators.required],
    });
  }

  onSubmitContainerForm() {
    if (this.containerForm.valid) {
      const newContainer: Container = { ...this.containerForm.value };
      this.containers.push(newContainer);
      this.resetContainerForm();
    }
  }
  
  resetContainerForm() {
    this.containerForm.reset();
  }

  deleteContainer(index: number) {
    this.containers.splice(index, 1);
  }

  openConfirmationDialog(index: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this container?',
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteContainer(index);
      }
    });
  }

}
