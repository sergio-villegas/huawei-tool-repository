import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private apiUrl = 'http://localhost:3010'; // Update with your server URL

  constructor(private http: HttpClient) {}

  // Get uploaded data from the server
  getUploadedData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/data`);
  }
}
