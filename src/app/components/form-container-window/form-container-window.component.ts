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
          this.fetchData.fetchUploadedData(); // Actualizar datos después de cargar
          this.resetContainerForm(); // Opcional: reiniciar el formulario después de la carga exitosa
          this.dialogRef.close({ /* Puedes pasar cualquier dato que quieras devolver al componente principal */ });
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
  }

  resetContainerForm() {
    this.containerForm.reset();
  }

}
