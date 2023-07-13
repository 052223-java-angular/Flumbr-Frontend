import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReportService } from 'src/app/services/report.service';
import { TokenService } from 'src/app/services/tokenservice.service';
import { Report } from 'src/app/models/report'; 
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss']
})
export class AdminReportComponent implements OnInit {

  displayedColumns: string[] = ['id', 'createTime', 'reason', 'userId', 'delete'];
  dataSource: any;
  reportdata: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reportService: ReportService,
              private tokenService: TokenService,
              
              ) {}


  ngOnInit(): void {
    this.getReports();
  }

  getReports() {
    this.reportService.getReports(1).subscribe(result =>{
      this.reportdata = result;

      this.dataSource = new MatTableDataSource<Report>(this.reportdata)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  filterChange(event:Event) {
    const filvalue=(event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  getRow(row:any) {
    console.log(row);
  }

  deletePost(postId: any) {
    console.log(postId);
    this.reportService.deletePost(postId);
  }

  deleteReport(id: any) {
    console.log(id);
    this.reportService.deleteReport(id);
  }

}
