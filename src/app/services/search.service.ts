// search.service.ts

import { Injectable } from '@angular/core';
import { Container } from '../interfaces/container.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  filterContainers(containers: Container[], searchTerm: string): Container[] {
    return containers.filter(container =>
      container.elementName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.workArea.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
