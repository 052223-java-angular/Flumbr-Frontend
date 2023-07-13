import { HttpClient, HttpResponse } from '@angular/common/http';
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

  getReports(): Observable<Report> {
    //delete the 1 when backend removes pages
    return this.http.get<any>(`${this.baseUrl}/reports/all/1`);
  }

  deletePost(postId: string): Observable<HttpResponse<any>> {
    console.log(postId);
    return this.http.delete<HttpResponse<any>>(`${this.baseUrl}/posts/id/${postId}`);
  }

  deleteReport(reportId: string) : Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${this.baseUrl}/reports/${reportId}`);
  }

  getPost(postId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts/id/${postId}`);
  }
}
