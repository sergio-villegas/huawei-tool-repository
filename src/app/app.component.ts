import { Component } from '@angular/core';
import { Container } from './container.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  containers: Container[] = [
    {
      elementName: 'HEDS user manual',
      user: 's84323766',
      date: new Date('10/27/2023'),
      workArea: 'IT&SOC'
    },
    {
      elementName: 'Tool for Huawei device configuration',
      user: 's84323766',
      date: new Date('10/27/2023'),
      workArea: 'IP'
    }
  ];

  elementName: string = '';
  user: string = '';
  date: Date = new Date();
  workArea: string = '';

  newContainer: Container = {
    elementName: '',
    user: '',
    date: new Date(),
    workArea: ''
  };


  onSubmitContainerForm() {
        
    this.newContainer.elementName = this.elementName;
    this.newContainer.user = this.user;
    this.newContainer.date = this.date;
    this.newContainer.workArea = this.workArea;
    
    const copiaContainer: Container = { ...this.newContainer };
    this.containers.push(copiaContainer)

  }

}
