import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Container } from 'src/app/interfaces/container.interface';

@Component({
  selector: 'app-container-details-dialog',
  templateUrl: './container-details-dialog.component.html',
  styleUrls: ['./container-details-dialog.component.scss']
})
export class ContainerDetailsDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { container: Container },
    public dialogRef: MatDialogRef<ContainerDetailsDialogComponent>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Manually set the backdrop styles
    const backdrop = document.getElementsByClassName('cdk-overlay-backdrop')[0] as HTMLElement;
    backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  }

  downloadFile(fileName: string): void {
    const downloadUrl = `http://localhost:3010/download/${fileName}`;
    this.http.get(downloadUrl, { responseType: 'arraybuffer' }).subscribe(
      (data: ArrayBuffer) => {
        const blob = new Blob([data]);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      },
      (error) => {
        console.error('Error downloading file:', error);
      }
    );
  }

  downloadAllFiles(container: Container): void {
    const fileNames: string[] = container.files.map((file) => file.fileName);

    // Download all files for the current container
    fileNames.forEach((fileName) => this.downloadFile(fileName));
  }

  getFileTypeImage(fileName: string): { path: string; className: string } {
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
  
    if (fileExtension === 'pdf') {
      return { path: '../../../assets/img/pdf.png', className: 'file-icon' };
    } 
    else if (fileExtension === 'txt') {
      return { path: '../../../assets/img/txt.png', className: 'file-icon-txt' };
    } 
    else if (fileExtension === 'xlsx') {
      return { path: '../../../assets/img/xlsx.png', className: 'file-icon-office' };
    }
    else if (fileExtension === 'pptx') {
      return { path: '../../../assets/img/pptx.png', className: 'file-icon-office' };
    }
    else if (fileExtension === 'docx') {
      return { path: '../../../assets/img/docx.png', className: 'file-icon-office' };
    }
    else if (fileExtension === 'rar') {
      return { path: '../../../assets/img/rar.png', className: 'file-icon-rar' };
    } 
    else {
      return { path: 'assets/default-icon.png', className: 'file-icon' };
    }
  }
  

  cleanFileName(fileName: string): string {
    return fileName.replace(/^\d+_/, '');
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  
}
