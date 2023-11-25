import { Injectable } from '@angular/core';
import { Container } from '../../interfaces/container.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  filterContainers(containers: Container[], searchTerm: string): Container[] {
    return containers.filter(container =>
      this.fieldIncludes(container.elementName, searchTerm) ||
      this.fieldIncludes(container.user, searchTerm) ||
      this.fieldIncludes(container.workArea, searchTerm)
    );
  }

  private fieldIncludes(field: string | undefined, searchTerm: string): boolean {
    return field !== undefined && field.toLowerCase().includes(searchTerm.toLowerCase());
  }
}
