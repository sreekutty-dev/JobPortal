import { Application } from "./application.model";

export interface Job {
    id?: number;
    title: string;
    description: string;
    company: string;
    location: string;
    salary?: string;
    requirements: string;
    job_type: 'full-time' | 'part-time' | 'contract' | 'internship';
    experience_level: 'entry' | 'mid' | 'senior' | 'executive';
    posted_date?: string;
    deadline?: string;
    is_active?: boolean;
    created_by?: number;
    applications?: Application[];
    
}
