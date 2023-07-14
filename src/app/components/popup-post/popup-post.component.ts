import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-popup-post',
  templateUrl: './popup-post.component.html',
  styleUrls: ['./popup-post.component.scss']
})
export class PopupPostComponent implements OnInit {
  inputData: any;
  post: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupPostComponent>,
    private reportService: ReportService,
  ) { }

  ngOnInit(): void {
    this.inputData = this.data.postId;
    this.getPost(this.inputData);
  }

  getPost(postId: any) {
    this.reportService.getPost(postId).subscribe(item => {
      this.post = item
      console.log(item);
    });
  }

}
