import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../global/app-settings';
import { Observable } from 'rxjs';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl = AppSettings.API_URL;

  constructor(private http: HttpClient) {}

  getReports(page: number): Observable<Report> {
    return this.http.get<any>(`${this.baseUrl}/reports/all/${page}`);
  }

  deletePost(postId: any) {
    this.http.delete(`${this.baseUrl}/posts/id/${postId}`);
  }

  deleteReport(reportId: any) {
    this.http.delete(`${this.baseUrl}/reports/${reportId}`);
  }
}
