import { Component } from '@angular/core';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Container } from './container.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

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

  constructor(public dialog: MatDialog) { }

  title: string = 'My App Title';
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
