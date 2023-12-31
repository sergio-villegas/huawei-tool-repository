import { Component, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Container } from '../../interfaces/container.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FetchDataService } from 'src/app/services/fetch-data/fetch-data.service';

@Component({
  selector: 'app-form-container-window',
  templateUrl: './form-container-window.component.html',
  styleUrls: ['./form-container-window.component.scss']
})
export class FormContainerWindowComponent {

  containers: Container[] = [];
  containerForm: FormGroup;

  constructor(
    private fetchData: FetchDataService,
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormContainerWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.containerForm = this.fb.group({
      elementName: ['', Validators.required],
      user: ['', Validators.required],
      date: [new Date(), Validators.required],
      workArea: ['', Validators.required],
      description: ['', Validators.required],
      files: [null, Validators.required],
    });
  }

  // Array of options for Work Area
  workAreas: string[] = ['MBB', 'FBB', 'GNOC', 'IT', 'RF', 'HR', 'NFV'];

  ngOnInit(): void {
    // Manually set the backdrop styles
    const backdrop = document.getElementsByClassName('cdk-overlay-backdrop')[0] as HTMLElement;
    backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  }

  onSubmitContainerForm() {
    console.log('Form value:', this.containerForm.value);
    if (this.containerForm.valid && this.containerForm.get('files')?.value?.length > 0) {
      const formData = new FormData();
      const formValue = this.containerForm.value;

      formData.append('elementName', formValue.elementName);
      formData.append('user', formValue.user);
      formData.append('date', new Date(formValue.date).toISOString());
      formData.append('workArea', formValue.workArea);
      formData.append('description', formValue.description);

      // Agregar archivos al FormData
      const files: FileList = formValue.files;
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      this.http.post('http://localhost:3010/upload', formData)
        .subscribe(response => {
          console.log('Files uploaded successfully:', response);
          this.fetchData.fetchUploadedData();
          this.resetContainerForm();
          this.dialogRef.close({});
        }, error => {
          console.error('Error uploading files:', error);
        });
    } else {
      console.error('Form is not valid or no files selected');
      console.log('Form validity:', this.containerForm.valid);
      console.log('Selected files:', this.containerForm.get('files')?.value);
    }
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    console.log('Selected files:', files);
    this.containerForm.get('files')?.setValue(files);

    const label = document.getElementById('file-upload-label');

    if (label) {
      if (files.length > 0) {
        label.textContent = `${files.length} files selected`;
      } else {
        label.textContent = 'Choose Files';
      }
    }
  }

  resetContainerForm() {
    this.containerForm.reset();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
