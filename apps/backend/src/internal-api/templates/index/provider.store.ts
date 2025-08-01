import { SearchResult } from '../interfaces/templates.interface';
import { Document } from 'flexsearch';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProviderIndex {
  private index: Document<SearchResult, true>;
  private indexSuggestions: Document<SearchResult, true>;

  getIndex() {
    return this.index;
  }

  setIndex(index: Document<SearchResult, true>) {
    this.index = index;
  }

  getIndexSuggestions() {
    return this.indexSuggestions;
  }

  setIndexSuggestions(indexSuggestions: Document<SearchResult, true>) {
    this.indexSuggestions = indexSuggestions;
  }
}
