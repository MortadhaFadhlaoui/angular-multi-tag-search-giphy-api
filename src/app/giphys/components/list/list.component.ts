import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Image } from 'src/app/shared/models/image';
import { SharedService } from 'src/app/shared/services/shared.service';
import { GiphyService } from '../../services/giphy.service';
import { takeUntil } from 'rxjs/operators';
import { SPACE } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  private _destroyed$ = new Subject();
  private timeout: any;

  // List
  gifs: Image[] = [];
  gifPage: number = 0;
  gifsLoading: boolean = false;

  // Search
  removable = true;
  separatorKeysCodes: number[] = [SPACE];
  tagCtrl = new FormControl();
  suggestionsTags: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );
  tags: string[] = [];

  @ViewChild('tagInput', { static: false })
  tagInput!: ElementRef<HTMLInputElement>;
  private tagPage: number = 0;
  public tagsLoading: boolean = false;

  constructor(
    private giphyService: GiphyService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.loadData(this.gifPage);
    this.inputHandler();
  }

  loadData(page: number) {
    this.gifsLoading = true;
    this.giphyService
      .getGifsByPage(page)
      .pipe(takeUntil(this._destroyed$))
      .subscribe(
        (response) => {
          if (page == 0) {
            // load first page
            this.gifs = this.sharedService.parseGifs(response['data']);
          } else {
            // paginate
            this.gifs.push(...this.sharedService.parseGifs(response['data']));
          }
          this.gifsLoading = false;
        },
        (error) => {
          console.error('something wont wrong');
        }
      );
  }

  onScroll() {
    if (!this.gifsLoading) {
      this.gifPage++;
      this.loadData(this.gifPage);
    }
  }

  add(event: MatChipInputEvent, inputName: HTMLInputElement): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
    }
    // Clear the input value
    // event.chipInput!.clear();
    inputName.value = '';
    this.resetVariables();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // add tag when not selected
    if (!this.tags.includes(event.option.viewValue)) {
      this.tags.push(event.option.viewValue);
    }
    // reset vars
    this.tagInput.nativeElement.value = '';
    this.resetVariables();
  }

  resetVariables() {
    this.tagCtrl.setValue(null);
    this.suggestionsTags.next([]);
    this.tagPage = 0;
  }

  private inputHandler() {
    // handle input change
    this.tagCtrl.valueChanges.subscribe((input: string | null) => {
      // check if the input not null && not exist in the suggestions tags
      if (input && !this.suggestionsTags.getValue().includes(input)) {
        clearTimeout(this.timeout);
        var $this = this;
        // wait the user finish typing
        this.timeout = setTimeout(() => {
          $this.searchSuggestionsTags(input, this.tagPage);
        }, 500);
      }
    });
  }

  searchSuggestionsTags(input: String, page: number) {
    this.tagsLoading = true;
    this.giphyService
      .searchSuggestionsTags(input, page)
      .pipe(takeUntil(this._destroyed$))
      .subscribe(
        (response) => {
          if (page == 0) {
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

  onScrollTags() {
    if (!this.tagsLoading) {
      this.tagPage++;
      this.searchSuggestionsTags(
        this.tagInput.nativeElement.value,
        this.tagPage
      );
    }
  }

  // destroy any subscribe to avoid memory leak
  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
