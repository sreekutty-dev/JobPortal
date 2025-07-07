import { Job } from './job.model';

export interface Application {
    id?: number;
    job: Job; // Full job object instead of just ID
    candidate: number; // User ID
    candidate_name: string;
    email: string;
    phone?: string;
    resume: File | string;
    voice?: File | string;
    cover_letter?: string;
    status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'accepted';
    applied_on?: string;
    updated_on?: string;
}
