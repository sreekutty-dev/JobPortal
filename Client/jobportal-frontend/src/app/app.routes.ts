import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './admin/dashboard/admin-dashboard.component';
import { AdminJobsComponent } from './admin/jobs/admin-jobs.component';
import { CandidateDashboardComponent } from './candidate/dashboard/candidate-dashboard.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobApplyComponent } from './components/job-apply/job-apply.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // Admin routes
  { 
    path: 'admin/dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'admin/jobs', 
    component: AdminJobsComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'admin/jobs/create', 
    component: AdminJobsComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'admin/jobs/:id', 
    component: AdminJobsComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'admin/jobs/:id/applications', 
    component: AdminJobsComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'admin/applications/:id', 
    component: AdminJobsComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },

  // Candidate routes
  { 
    path: 'candidate/dashboard', 
    component: CandidateDashboardComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'candidate/jobs', 
    component: JobListComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'candidate/apply/:id', 
    component: JobApplyComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'candidate/application/:id', 
    component: JobApplyComponent, 
    canActivate: [AuthGuard] 
  },

  // Wildcard route
  { path: '**', redirectTo: 'login' },
];
