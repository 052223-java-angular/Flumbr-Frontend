import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchTerms: string[] = [];
  constructor() { }

  setSearchTerms(terms: string[]) {
    this.searchTerms = terms;
  }

  getSearchTerms() {
    return this.searchTerms;
  }
}
