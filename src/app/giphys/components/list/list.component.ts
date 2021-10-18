import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Image } from 'src/app/shared/models/image';
import { SharedService } from 'src/app/shared/services/shared.service';
import { GiphyService } from '../../services/giphy.service';
import { takeUntil } from 'rxjs/operators';
import { SPACE } from '@angular/cdk/keycodes';
import { Tag } from 'src/app/shared/models/tag';
import { SearchInput } from 'src/app/shared/models/search-input';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  private _destroyed$ = new Subject();

  // List
  gifs: Image[] = [];
  gifPage: number = 0;
  gifsLoading: boolean = false;

  // Search Tags
  separatorKeysCodes: number[] = [SPACE];
  suggestionsTags: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );
  tags: string[] = [];
  tagsLoading: boolean = false;
  placeholder: string = 'Search Gifs';

  // Search Gifs
  filteredGifs: Image[] = [];
  searchGifPage: number = 0;

  constructor(
    private giphyService: GiphyService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.loadData(this.gifPage);
  }

  loadData(page: number) {
    this.gifPage = page;
    this.gifsLoading = true;
    this.giphyService
      .getGifsByPage(page)
      .pipe(takeUntil(this._destroyed$))
      .subscribe(
        (response) => {
          if (page === 0) {
            // load first page
            this.gifs = this.sharedService.parseGifs(response['data']);
          } else {
            // paginate
            this.gifs.push(...this.sharedService.parseGifs(response['data']));
          }
          this.filteredGifs = this.gifs;
          this.gifsLoading = false;
        },
        (error) => {
          console.error('something wont wrong');
        }
      );
  }

  onScroll() {
    if (!this.gifsLoading) {
      if (this.tags.length > 0) {
        this.searchGifs(this.tags, ++this.searchGifPage);
      } else {
        this.loadData(++this.gifPage);
      }
    }
  }

  onAdd(tags: string[]): void {
    this.searchGifs(tags, 0);
  }

  onRemove(tags: string[]): void {
    if (tags.length > 0) {
      this.searchGifs(tags, 0);
    } else {
      this.tags = [];
      this.searchGifPage = 0;
      this.filteredGifs = this.gifs;
    }
  }

  onSelected(tags: string[]): void {
    this.searchGifs(tags, 0);
  }

  onTextChange(input: string) {
    this.searchSuggestionsTags(input, 0);
  }

  searchSuggestionsTags(input: string, page: number) {
    this.tagsLoading = true;
    this.giphyService
      .searchSuggestionsTags(input, page)
      .pipe(takeUntil(this._destroyed$))
      .subscribe(
        (response) => {
          if (page === 0) {
            // load first page
            this.suggestionsTags.next(
              response['data'].map((tag: Tag) => tag.name)
            );
          } else {
            // paginate
            this.suggestionsTags.next([
              ...this.suggestionsTags.getValue(),
              ...response['data'].map((tag: Tag) => tag.name),
            ]);
          }
          this.tagsLoading = false;
        },
        (error) => {
          console.error('something wont wrong');
        }
      );
  }

  onScrollTags(searchInput: SearchInput) {
    this.searchSuggestionsTags(searchInput.input, searchInput.page);
  }

  searchGifs(tags: string[], page: number) {
    this.tags = tags;
    this.searchGifPage = page;
    this.gifsLoading = true;
    this.giphyService
      .searchGifs(tags.join(' '), page)
      .pipe(takeUntil(this._destroyed$))
      .subscribe(
        (response) => {
          if (page === 0) {
            // load first page
            this.filteredGifs = this.sharedService.parseGifs(response['data']);
          } else {
            // paginate
            this.filteredGifs.push(
              ...this.sharedService.parseGifs(response['data'])
            );
          }
          this.gifsLoading = false;
        },
        (error) => {
          console.error('something wont wrong');
        }
      );
  }

  // destroy any subscribe to avoid memory leak
  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
