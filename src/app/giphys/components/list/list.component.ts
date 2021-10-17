import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Image } from 'src/app/shared/models/image';
import { SharedService } from 'src/app/shared/services/shared.service';
import { GiphyService } from '../../services/giphy.service';
import { takeUntil } from 'rxjs/operators';

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

  constructor(
    private giphyService: GiphyService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.loadData(this.gifPage);
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

  // destroy any subscribe to avoid memory leak
  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
