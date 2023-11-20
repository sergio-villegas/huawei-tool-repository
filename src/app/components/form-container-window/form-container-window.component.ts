import { Component, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Container } from '../../interfaces/container.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-container-window',
  templateUrl: './form-container-window.component.html',
  styleUrls: ['./form-container-window.component.scss']
})
export class FormContainerWindowComponent {

  
  @Input() containers: Container[] = [];

  containerForm: FormGroup;

  constructor(
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
    });
  }

  onSubmitContainerForm() {
    if (this.containerForm.valid) {
      const newContainer: Container = { ...this.containerForm.value };
      this.containers.push(newContainer);
      this.resetContainerForm();
      this.dialogRef.close(newContainer);
    }
  }
  
  resetContainerForm() {
    this.containerForm.reset();
  }



}
