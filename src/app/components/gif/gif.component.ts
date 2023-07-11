import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GifService } from 'src/app/services/gif/gif.service';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.scss'],
})
export class GifComponent implements OnInit {
  @Output() gifChosenEvent = new EventEmitter<string>();
  @Output() closeGifComponentEvent = new EventEmitter();
  gifs: any[] = [];

  constructor(private gifService: GifService) {}

  ngOnInit(): void {
    this.gifService.getTrendingGifs().subscribe({
      next: (res) => {
        console.log(res);
        this.gifs = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  search(searchTerm: string) {
    if (searchTerm.length == 0) {
      this.gifService.getTrendingGifs().subscribe({
        next: (res) => {
          this.gifs = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.gifService.getSearchGifs(searchTerm).subscribe({
        next: (res) => {
          this.gifs = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  debounceSearch = this.debouncer(
    (searchTerm: string) => this.search(searchTerm),
    500
  );

  debouncer(func: Function, delay: number) {
    let timerId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  handleGifClick(gifUrl: string) {
    this.gifChosenEvent.emit(gifUrl);
  }

  closeGifComponent() {
    this.closeGifComponentEvent.emit();
  }
}
