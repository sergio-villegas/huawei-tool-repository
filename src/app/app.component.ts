import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { Container } from './interfaces/container.interface';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { FormContainerWindowComponent } from './components/form-container-window/form-container-window.component';
import { ContainerDetailsDialogComponent } from './components/container-details-dialog/container-details-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 }))
      ])
    ]),
    trigger('rotateButton', [
      state('normal', style({ transform: 'rotate(0deg)' })),
      state('reversed', style({ transform: 'rotate(180deg)' })),
      transition('normal <=> reversed', animate('300ms ease-in-out')),
    ])
  ]
})
export class AppComponent {

  containers: Container[] = [
    {
      elementName: 'Sample Container 1',
      user: 'sampleUser7',
      date: new Date('2023-11-08'),
      workArea: 'GNOC',
      description: 'Test description sample'
    }
    ,
    {
      elementName: 'Sample Container 2',
      user: 'sampleUser2',
      date: new Date('2023-11-03'),
      workArea: 'MBB',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 3',
      user: 'sampleUser3',
      date: new Date('2023-11-04'),
      workArea: 'FBB',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 4',
      user: 'sampleUser4',
      date: new Date('2023-11-05'),
      workArea: 'Saas',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 5',
      user: 'sampleUser5',
      date: new Date('2023-11-06'),
      workArea: 'RF',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 6',
      user: 'sampleUser6',
      date: new Date('2023-11-07'),
      workArea: 'CEM',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 7',
      user: 'sampleUser7',
      date: new Date('2023-11-08'),
      workArea: 'Cybersecurity',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 8',
      user: 'sampleUser1',
      date: new Date('2023-11-02'),
      workArea: 'HR',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 9',
      user: 'sampleUser2',
      date: new Date('2023-11-03'),
      workArea: 'MBB',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 10',
      user: 'sampleUser3',
      date: new Date('2023-11-04'),
      workArea: 'FBB',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 11',
      user: 'sampleUser4',
      date: new Date('2023-11-05'),
      workArea: 'RF',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 12',
      user: 'sampleUser5',
      date: new Date('2023-11-06'),
      workArea: 'NET',
      description: 'Test description sample'
    },
    {
      elementName: 'Sample Container 13',
      user: 'sampleUser6',
      date: new Date('2023-11-07'),
      workArea: 'GNOC',
      description: 'Test description sample'
    },
    {
      elementName: 'Creacion de un CVR para creacion de una cuenta en HEDS',
      user: 's84323766',
      date: new Date('2023-11-02'),
      workArea: 'IT & SOC',
      description: 'Esta serie de documentos busca los pasos a seguir para poder dar de alta un ticket de creacion de usuario para poder utilizar las maquinas virtuales a traves de HEDS.'
    }
  ];

  constructor(public dialog: MatDialog) { }

  title: string = 'huawei-repository';
  invertirOrden = false;
  rotateButtonState = 'normal';
  animationState = 'in';

  ngOnInit() {
    this.filteredContainers = this.containers;
    this.invertirOrden = !this.invertirOrden;
    this.rotateButtonState = this.invertirOrden ? 'reversed' : 'normal';
    setTimeout(() => {
      this.animationState = 'in';
    }, 1000);
  }

  toggleOrden() {
    this.invertirOrden = !this.invertirOrden;
    this.rotateButtonState = this.invertirOrden ? 'reversed' : 'normal';
  }

  deleteContainer(container: Container): void {
    const index = this.containers.indexOf(container);
    if (index !== -1) {
      this.containers.splice(index, 1);
      this.performSearch();
    }
  }

  openConfirmationDialog(container: Container): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this container?',
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteContainer(container);
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
      data: {
        container: container
      },
    });
  }

  searchTerm: string = '';
  filteredContainers: Container[] = [];
  noResultsFound: boolean = false;

  performSearch() {
    // Filtra los contenedores según el término de búsqueda
    this.filteredContainers = this.containers.filter(container =>
      container.elementName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      container.user.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      container.workArea.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.noResultsFound = this.filteredContainers.length === 0;
  }
  
}
