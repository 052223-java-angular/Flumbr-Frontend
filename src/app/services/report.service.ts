import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../global/app-settings';
import { Observable } from 'rxjs';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  baseUrl = AppSettings.API_URL;

  constructor(private http: HttpClient) {}

  getReports(): Observable<Report> {
    //delete the 1 when backend removes pages
    return this.http.get<any>(`${this.baseUrl}/reports/all/1`);
  }

  deletePost(postId: any) {
    return this.http.delete(`${this.baseUrl}/posts/id/${postId}`, {
      responseType: 'text',
    });
  }

  deleteReport(reportId: any) {
    return this.http.delete(`${this.baseUrl}/reports/${reportId}`);
  }

  getPost(postId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts/id/${postId}`);
  }
}
