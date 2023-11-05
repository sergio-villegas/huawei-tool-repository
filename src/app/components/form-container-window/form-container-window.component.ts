import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Container } from '../../container.interface';

@Component({
  selector: 'app-form-container-window',
  templateUrl: './form-container-window.component.html',
  styleUrls: ['./form-container-window.component.scss']
})
export class FormContainerWindowComponent {

  
  @Input() containers: Container[] = [];

  containerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.containerForm = this.fb.group({
      elementName: ['', Validators.required],
      user: ['', Validators.required],
      date: [new Date(), Validators.required],
      workArea: ['', Validators.required],
    });
  }

  onSubmitContainerForm() {
    if (this.containerForm.valid) {
      const newContainer: Container = { ...this.containerForm.value };
      this.containers.push(newContainer);
      this.resetContainerForm();
    }
  }
  
  resetContainerForm() {
    this.containerForm.reset();
  }



}
