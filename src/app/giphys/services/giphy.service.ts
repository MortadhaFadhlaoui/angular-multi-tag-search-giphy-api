import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LANG, LIMIT, PAGE_NUMBER, RATING } from 'src/app/shared/constant';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  getGifsByPage(
    pageNumber: number = PAGE_NUMBER,
    limit: number = LIMIT
  ): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/trending?api_key=${
        this.apiKey
      }&limit=${limit}&offset=${this.sharedService.calculateOffset(
        limit,
        pageNumber
      )}&rating=${RATING}`
    );
  }

  searchSuggestionsTags(
    query: string,
    pageNumber: number = PAGE_NUMBER,
    limit: number = LIMIT
  ): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/search/tags?api_key=${
        this.apiKey
      }&q=${query}&limit=${limit}&offset=${this.sharedService.calculateOffset(
        limit,
        pageNumber
      )}`
    );
  }

  searchGifs(
    query: string,
    pageNumber: number = PAGE_NUMBER,
    limit: number = LIMIT
  ): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/search?api_key=${
        this.apiKey
      }&q=${query}&limit=${limit}&offset=${this.sharedService.calculateOffset(
        limit,
        pageNumber
      )}&rating=${RATING}&lang=${LANG}`
    );
  }
}
