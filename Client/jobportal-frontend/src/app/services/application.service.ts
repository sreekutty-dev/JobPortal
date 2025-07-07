import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../models/application.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private apiUrl = 'http://127.0.0.1:8000/api/applications/';

  constructor(private http: HttpClient) {}

  apply(applicationData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, applicationData);
  }

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }
}
