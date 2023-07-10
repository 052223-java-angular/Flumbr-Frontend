import { Component, OnInit } from '@angular/core';
import { GifService } from 'src/app/services/gif/gif.service';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.scss'],
})
export class GifComponent implements OnInit {
  constructor(private gifService: GifService) {}

  ngOnInit(): void {
    this.gifService.getTrendingGifs().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
