import { Component } from '@angular/core';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Container } from './container.interface';
import { FormContainerWindowComponent } from './components/form-container-window/form-container-window.component';
import { ContainerDetailsDialogComponent } from './components/container-details-dialog/container-details-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  containers: Container[] = [
    {
      elementName: 'Creacion de un CVR para creacion de una cuenta en HEDS',
      user: 'sampleUser1',
      date: new Date('2023-11-02'),
      workArea: 'Sample Work Area 1',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 2',
      user: 'sampleUser2',
      date: new Date('2023-11-03'),
      workArea: 'Sample Work Area 2',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 3',
      user: 'sampleUser3',
      date: new Date('2023-11-04'),
      workArea: 'Sample Work Area 3',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 4',
      user: 'sampleUser4',
      date: new Date('2023-11-05'),
      workArea: 'Sample Work Area 4',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 5',
      user: 'sampleUser5',
      date: new Date('2023-11-06'),
      workArea: 'Sample Work Area 5',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 6',
      user: 'sampleUser6',
      date: new Date('2023-11-07'),
      workArea: 'Sample Work Area 6',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 7',
      user: 'sampleUser7',
      date: new Date('2023-11-08'),
      workArea: 'Sample Work Area 7',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 1',
      user: 'sampleUser1',
      date: new Date('2023-11-02'),
      workArea: 'Sample Work Area 1',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 2',
      user: 'sampleUser2',
      date: new Date('2023-11-03'),
      workArea: 'Sample Work Area 2',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 3',
      user: 'sampleUser3',
      date: new Date('2023-11-04'),
      workArea: 'Sample Work Area 3',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 4',
      user: 'sampleUser4',
      date: new Date('2023-11-05'),
      workArea: 'Sample Work Area 4',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 5',
      user: 'sampleUser5',
      date: new Date('2023-11-06'),
      workArea: 'Sample Work Area 5',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 6',
      user: 'sampleUser6',
      date: new Date('2023-11-07'),
      workArea: 'Sample Work Area 6',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 7',
      user: 'sampleUser7',
      date: new Date('2023-11-08'),
      workArea: 'Sample Work Area 7',
      description: 'Test description sample'
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

  openContainerFormDialog(): void {
    const dialogRef = this.dialog.open(FormContainerWindowComponent, {
      width: '2000px',
      data: {
        containers: this.containers
      }
    });

    dialogRef.afterClosed().subscribe((newContainer: Container | undefined) => {
      if (newContainer) {
        this.containers.push(newContainer);
      }
    });
  }

  openContainerDetailsDialog(container: Container): void {
    const dialogRef = this.dialog.open(ContainerDetailsDialogComponent, {
        width: '2000px',
        height: '700px',
        data: {
            container: container
        }
    });
}

}
