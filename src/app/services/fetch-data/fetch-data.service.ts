import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Container } from 'src/app/interfaces/container.interface';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  private apiUrl = 'http://localhost:3010';

  constructor(private http: HttpClient) {}

  fetchUploadedData(): Observable<Container[]> {
    return this.http.get<Container[]>(`${this.apiUrl}/api/data`);
  }
}
