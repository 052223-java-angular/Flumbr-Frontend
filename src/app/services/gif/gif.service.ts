import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/global/app-settings';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  giphyApiUrl = AppSettings.GIPHY_API_URL;
  giphyApiKey = AppSettings.GIPHY_API_KEY;

  constructor(private http: HttpClient) {}

  getTrendingGifs() {
    return this.http.get<{ data: any[] }>(
      `${this.giphyApiUrl}/trending?api_key=${this.giphyApiKey}`,
      {
        headers: { skip: '' },
      }
    );
  }

  getSearchGifs(search: string) {
    return this.http.get<{ data: any[] }>(
      `${this.giphyApiUrl}/search?api_key=${this.giphyApiKey}&q=${search}&limit=20`,
      {
        headers: { skip: '' },
      }
    );
  }
}
