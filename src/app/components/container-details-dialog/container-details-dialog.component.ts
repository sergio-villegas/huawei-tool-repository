import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Container } from 'src/app/container.interface';

@Component({
  selector: 'app-container-details-dialog',
  templateUrl: './container-details-dialog.component.html',
  styleUrls: ['./container-details-dialog.component.scss']
})
export class ContainerDetailsDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { container: Container }) {}
  
}
