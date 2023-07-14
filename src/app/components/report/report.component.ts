import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReportPayload } from 'src/app/models/report-payload';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  inputdata!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ReportComponent>,
    private builder: FormBuilder,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.inputdata = this.data;
  }

  closepopup() {
    this.ref.close();
  }

  submitReport() {
    const payload: ReportPayload = {
      postId: this.inputdata.postId,
      reason: this.reportForm.controls['reason'].value,
    };

    this.postService.reportPost(payload).subscribe((res) => {
      this.closepopup();
    });
  }

  reportForm = this.builder.group({
    reason: this.builder.control('', Validators.required),
  });
}
