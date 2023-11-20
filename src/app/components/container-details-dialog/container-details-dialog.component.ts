import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Container } from 'src/app/interfaces/container.interface';

@Component({
  selector: 'app-container-details-dialog',
  templateUrl: './container-details-dialog.component.html',
  styleUrls: ['./container-details-dialog.component.scss']
})
export class ContainerDetailsDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { container: Container },
    public dialogRef: MatDialogRef<ContainerDetailsDialogComponent>
  ) {}

  ngOnInit(): void {
    // Manually set the backdrop styles
    const backdrop = document.getElementsByClassName('cdk-overlay-backdrop')[0] as HTMLElement;
    backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  }
  
}
