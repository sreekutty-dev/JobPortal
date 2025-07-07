import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { Job } from '../../models/job.model';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-candidate-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './candidate-dashboard.component.html',
  styleUrls: ['./candidate-dashboard.component.scss']
})
export class CandidateDashboardComponent implements OnInit {
  recentJobs: Job[] = [];
  myApplications: Application[] = [];
  candidateName: string = '';

  constructor(
    private jobService: JobService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadRecentJobs();
    this.loadMyApplications();
    this.candidateName = localStorage.getItem('username') || 'Candidate';
  }

  loadRecentJobs() {
    this.jobService.getJobs().subscribe({
      next: (jobs) => {
        this.recentJobs = jobs.slice(0, 6); // Show only 6 recent jobs
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
      }
    });
  }

  loadMyApplications() {
    this.jobService.getMyApplications().subscribe({
      next: (applications) => {
        this.myApplications = applications;
      },
      error: (error) => {
        console.error('Error loading applications:', error);
      }
    });
  }
} 