import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';
import { Application } from '../models/application.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private baseUrl = 'http://127.0.0.1:8000/api';
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  // Job related methods
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/jobs/`, { headers: this.headers });
  }

  getJob(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.baseUrl}/jobs/${id}/`, { headers: this.headers });
  }

  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(`${this.baseUrl}/jobs/`, job, { headers: this.headers });
  }

  updateJob(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.baseUrl}/jobs/${id}/`, job, { headers: this.headers });
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/jobs/${id}/`, { headers: this.headers });
  }

  // Application related methods
  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/applications/`, { headers: this.headers });
  }

  getMyApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/applications/my_applications/`, { headers: this.headers });
  }

  getApplication(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.baseUrl}/applications/${id}/`, { headers: this.headers });
  }

  createApplication(application: FormData): Observable<Application> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post<Application>(`${this.baseUrl}/applications/`, application, { headers });
  }

  updateApplicationStatus(id: number, status: string): Observable<Application> {
    return this.http.patch<Application>(
      `${this.baseUrl}/applications/${id}/update_status/`, 
      { status }, 
      { headers: this.headers }
    );
  }

  // Job applications (for admin)
  getJobApplications(jobId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/jobs/${jobId}/applications/`, { headers: this.headers });
  }
}
