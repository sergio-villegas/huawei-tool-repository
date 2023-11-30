import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { Container } from './interfaces/container.interface';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { FormContainerWindowComponent } from './components/form-container-window/form-container-window.component';
import { ContainerDetailsDialogComponent } from './components/container-details-dialog/container-details-dialog.component';
import { SearchService } from './services/search-data/search.service';
import { GetDataService } from './services/get-data/get-data.service';
import { HttpClient } from '@angular/common/http';
import { FetchDataService } from './services/fetch-data/fetch-data.service';
import { ChangeDetectorRef } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgZone } from '@angular/core';


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

  constructor(
    private zone: NgZone,
    private fetchData: FetchDataService,
    public dialog: MatDialog,
    private searchService: SearchService,
    private getData: GetDataService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef) { }

  filteredContainers: Container[] = [];
  title: string = 'huawei-tool-repository';
  noResultsFound: boolean = false;
  containers: Container[] = [];
  rotateButtonState = 'normal';
  selectedFiles: File[] = [];
  searchTerm: string = '';
  invertirOrden = false;
  animationState = 'in';

  ngOnInit() {
    this.fetchData.fetchUploadedData().pipe(
      switchMap((data: Container[]) => {
        this.containers = data;
        this.updateFilteredContainers();
        this.invertirOrden = !this.invertirOrden;
        this.rotateButtonState = this.invertirOrden ? 'reversed' : 'normal';
        setTimeout(() => {
          this.animationState = 'in';
        }, 1000);
        return of(data); // Devuelve los datos para la siguiente suscripción
      })
    ).subscribe();
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
        this.fetchData.fetchUploadedData().subscribe((data: Container[]) => {
          this.containers = data;
          this.updateFilteredContainers();

          if (!this.invertirOrden) {
            // Solo invertir si la lista está en estado normal
            this.invertirOrden = !this.invertirOrden;
            this.rotateButtonState = this.invertirOrden ? 'reversed' : 'normal';
            this.animationState = 'in';
          }
        });
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

  updateFilteredContainers() {
    this.filteredContainers = this.searchService.filterContainers(this.containers, this.searchTerm);
    this.noResultsFound = this.filteredContainers.length === 0;
  }

  performSearch() {
    this.filteredContainers = this.searchService.filterContainers(this.containers, this.searchTerm);
    this.noResultsFound = this.filteredContainers.length === 0;

    if (this.currentPage > this.totalPages()) {
      this.currentPage = 1;
    }
  }

  fetchUploadedData(): void {
    this.fetchData.fetchUploadedData().subscribe(
      (data: Container[]) => {
        this.containers = data;
        console.log('Uploaded Data:', this.containers);
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  pageSize: number = 12;
  currentPage: number = 1;

  getItems(): Container[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredContainers.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  totalPages(): number {
    return Math.ceil(this.filteredContainers.length / this.pageSize);
  }

  inputPage: number = 1; // Initialize with a default value

  goToPage() {
    if (this.inputPage >= 1 && this.inputPage <= this.totalPages()) {
      this.currentPage = this.inputPage;
      // Add logic to fetch data for the new page or update content accordingly
    }
  }

}
