import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-apply',
  standalone: true,
  imports: [CommonModule, FormsModule],
  // template: `
    // <div class="container mt-4">
    //   <div class="row">
    //     <div class="col-12">
    //       <h2>Apply for Job</h2>
    //       <div *ngIf="job" class="card mb-4">
    //         <div class="card-body">
    //           <h3>{{ job.title }}</h3>
    //           <h6 class="text-muted">{{ job.company }} - {{ job.location }}</h6>
    //           <p class="mt-3">{{ job.description }}</p>
    //           <div class="row">
    //             <div class="col-md-6">
    //               <strong>Salary:</strong> {{ job.salary || 'Not specified' }}
    //             </div>
    //             <div class="col-md-6">
    //               <strong>Requirements:</strong> {{ job.requirements }}
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div class="card">
    //         <div class="card-body">
    //           <h4>Application Form</h4>
    //           <form (ngSubmit)="onSubmit()" #applicationForm="ngForm">
    //             <div class="row">
    //               <div class="col-md-6 mb-3">
    //                 <label for="candidateName" class="form-label">Full Name *</label>
    //                 <input 
    //                   type="text" 
    //                   class="form-control" 
    //                   id="candidateName"
    //                   name="candidateName"
    //                   [(ngModel)]="application.candidate_name"
    //                   required>
    //               </div>
    //               <div class="col-md-6 mb-3">
    //                 <label for="email" class="form-label">Email *</label>
    //                 <input 
    //                   type="email" 
    //                   class="form-control" 
    //                   id="email"
    //                   name="email"
    //                   [(ngModel)]="application.email"
    //                   required>
    //               </div>
    //             </div>

    //             <div class="row">
    //               <div class="col-md-6 mb-3">
    //                 <label for="phone" class="form-label">Phone Number</label>
    //                 <input 
    //                   type="tel" 
    //                   class="form-control" 
    //                   id="phone"
    //                   name="phone"
    //                   [(ngModel)]="application.phone">
    //               </div>
    //             </div>

    //             <div class="mb-3">
    //               <label for="resume" class="form-label">Resume/CV *</label>
    //               <input 
    //                 type="file" 
    //                 class="form-control" 
    //                 id="resume"
    //                 name="resume"
    //                 (change)="onResumeSelected($event)"
    //                 accept=".pdf,.doc,.docx"
    //                 required>
    //               <div class="form-text">Upload your resume in PDF, DOC, or DOCX format</div>
    //             </div>

    //             <div class="mb-3">
    //               <label for="coverLetter" class="form-label">Cover Letter</label>
    //               <textarea 
    //                 class="form-control" 
    //                 id="coverLetter"
    //                 name="coverLetter"
    //                 [(ngModel)]="application.cover_letter"
    //                 rows="5"
    //                 placeholder="Tell us why you're interested in this position..."></textarea>
    //             </div>

    //             <div class="mb-3">
    //               <label for="voice" class="form-label">Voice Introduction (Optional)</label>
    //               <input 
    //                 type="file" 
    //                 class="form-control" 
    //                 id="voice"
    //                 name="voice"
    //                 (change)="onVoiceSelected($event)"
    //                 accept="audio/*">
    //               <div class="form-text">Upload a short voice introduction (MP3, WAV, etc.)</div>
    //             </div>

    //             <div class="d-flex justify-content-between">
    //               <button type="button" class="btn btn-secondary" (click)="goBack()">
    //                 Cancel
    //               </button>
    //               <button 
    //                 type="submit" 
    //                 class="btn btn-primary"
    //                 [disabled]="!applicationForm.form.valid || isSubmitting">
    //                 {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
    //               </button>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  // `,
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.scss']
})
export class JobApplyComponent implements OnInit {
  job: Job | null = null;
  application: any = {
    candidate_name: '',
    email: '',
    phone: '',
    cover_letter: '',
    resume: null,
    voice: null
  };
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) {}

  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.loadJob(parseInt(jobId));
    }
  }

  loadJob(jobId: number) {
    this.jobService.getJob(jobId).subscribe({
      next: (job) => {
        this.job = job;
      },
      error: (error) => {
        console.error('Error loading job:', error);
        this.errorMessage = 'Error loading job details';
      }
    });
  }

  onResumeSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.application.resume = file;
    }
  }

  onVoiceSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.application.voice = file;
    }
  }

  onSubmit() {
    if (!this.job || !this.application.resume) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const formData = new FormData();
    formData.append('job', this.job.id!.toString());
    formData.append('candidate_name', this.application.candidate_name);
    formData.append('email', this.application.email);
    if (this.application.phone) {
      formData.append('phone', this.application.phone);
    }
    if (this.application.cover_letter) {
      formData.append('cover_letter', this.application.cover_letter);
    }
    formData.append('resume', this.application.resume);
    if (this.application.voice) {
      formData.append('voice', this.application.voice);
    }

    this.jobService.createApplication(formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        alert('Application submitted successfully!');
        this.router.navigate(['/candidate/dashboard']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = 'Error submitting application. Please try again.';
        console.error('Application error:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/candidate/jobs']);
  }
}

