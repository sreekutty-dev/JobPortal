import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { Job } from '../../models/job.model';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  // template: `
  //   <div class="container mt-4">
  //     <div class="row">
  //       <div class="col-12">
  //         <h2>Admin Dashboard</h2>
  //         <div class="d-flex justify-content-between align-items-center mb-4">
  //           <h3>Job Management</h3>
  //           <button class="btn btn-primary" routerLink="/admin/jobs/create">Add New Job</button>
  //         </div>
  //       </div>
  //     </div>

  //     <!-- Statistics Cards -->
  //     <div class="row mb-4">
  //       <div class="col-md-3 mb-3">
  //         <div class="card bg-primary text-white">
  //           <div class="card-body">
  //             <h5 class="card-title">Total Jobs</h5>
  //             <h2>{{ totalJobs }}</h2>
  //           </div>
  //         </div>
  //       </div>
  //       <div class="col-md-3 mb-3">
  //         <div class="card bg-success text-white">
  //           <div class="card-body">
  //             <h5 class="card-title">Active Jobs</h5>
  //             <h2>{{ activeJobs }}</h2>
  //           </div>
  //         </div>
  //       </div>
  //       <div class="col-md-3 mb-3">
  //         <div class="card bg-info text-white">
  //           <div class="card-body">
  //             <h5 class="card-title">Total Applications</h5>
  //             <h2>{{ totalApplications }}</h2>
  //           </div>
  //         </div>
  //       </div>
  //       <div class="col-md-3 mb-3">
  //         <div class="card bg-warning text-white">
  //           <div class="card-body">
  //             <h5 class="card-title">Pending Reviews</h5>
  //             <h2>{{ pendingApplications }}</h2>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     <!-- Recent Jobs -->
  //     <div class="row mb-4">
  //       <div class="col-12">
  //         <h4>Recent Job Postings</h4>
  //         <div class="table-responsive">
  //           <table class="table table-striped">
  //             <thead>
  //               <tr>
  //                 <th>Title</th>
  //                 <th>Company</th>
  //                 <th>Location</th>
  //                 <th>Applications</th>
  //                 <th>Status</th>
  //                 <th>Actions</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               <tr *ngFor="let job of recentJobs">
  //                 <td>{{ job.title }}</td>
  //                 <td>{{ job.company }}</td>
  //                 <td>{{ job.location }}</td>
  //                 <td>
  //                   <span class="badge bg-secondary">{{ job?.applications?.length || 0 }}</span>
  //                 </td>
  //                 <td>
  //                   <span class="badge" 
  //                         [ngClass]="job.is_active ? 'bg-success' : 'bg-danger'">
  //                     {{ job.is_active ? 'Active' : 'Inactive' }}
  //                   </span>
  //                 </td>
  //                 <td>
  //                   <button class="btn btn-sm btn-outline-primary me-1" 
  //                           [routerLink]="['/admin/jobs', job.id]">
  //                     Edit
  //                   </button>
  //                   <button class="btn btn-sm btn-outline-info" 
  //                           [routerLink]="['/admin/jobs', job.id, 'applications']">
  //                     View Apps
  //                   </button>
  //                 </td>
  //               </tr>
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     </div>

  //     <!-- Recent Applications -->
  //     <div class="row">
  //       <div class="col-12">
  //         <h4>Recent Applications</h4>
  //         <div class="table-responsive">
  //           <table class="table table-striped">
  //             <thead>
  //               <tr>
  //                 <th>Candidate</th>
  //                 <th>Job Title</th>
  //                 <th>Applied Date</th>
  //                 <th>Status</th>
  //                 <th>Actions</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               <tr *ngFor="let application of recentApplications">
  //                 <td>{{ application.candidate_name }}</td>
  //                 <td>{{ application.job.title }}</td>
  //                 <td>{{ application.applied_on | date:'short' }}</td>
  //                 <td>
  //                   <span class="badge" 
  //                         [ngClass]="{
  //                           'bg-warning': application.status === 'pending',
  //                           'bg-info': application.status === 'reviewed',
  //                           'bg-primary': application.status === 'shortlisted',
  //                           'bg-success': application.status === 'accepted',
  //                           'bg-danger': application.status === 'rejected'
  //                         }">
  //                     {{ application.status | titlecase }}
  //                   </span>
  //                 </td>
  //                 <td>
  //                   <button class="btn btn-sm btn-outline-primary" 
  //                           [routerLink]="['/admin/applications', application.id]">
  //                     Review
  //                   </button>
  //                 </td>
  //               </tr>
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // `,
  templateUrl: './admin-dashboard.component.html',
  // styles: [`
  //   .card {
  //     transition: transform 0.2s;
  //   }
  //   .card:hover {
  //     transform: translateY(-2px);
  //   }
  // `]
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  totalJobs: number = 0;
  activeJobs: number = 0;
  totalApplications: number = 0;
  pendingApplications: number = 0;
  recentJobs: Job[] = [];
  recentApplications: Application[] = [];
stats: any;

  constructor(
    private jobService: JobService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Load jobs
    this.jobService.getJobs().subscribe({
      next: (jobs) => {
        this.recentJobs = jobs.slice(0, 5);
        this.totalJobs = jobs.length;
        this.activeJobs = jobs.filter(job => job.is_active).length;
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
      }
    });

    // Load applications
    this.jobService.getApplications().subscribe({
      next: (applications) => {
        this.recentApplications = applications.slice(0, 5);
        this.totalApplications = applications.length;
        this.pendingApplications = applications.filter(app => app.status === 'pending').length;
      },
      error: (error) => {
        console.error('Error loading applications:', error);
      }
    });
  }
} 