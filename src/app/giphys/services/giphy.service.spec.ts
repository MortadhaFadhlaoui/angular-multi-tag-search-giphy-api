import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { GiphyService } from './giphy.service';
import { GiphyData } from 'src/app/shared/models/giphy-data';
import { environment } from 'src/environments/environment';
import { LANG, LIMIT, PAGE_NUMBER, RATING } from 'src/app/shared/constant';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Tag } from 'src/app/shared/models/tag';

describe('GiphyService', () => {
  let injector: TestBed;
  let service: GiphyService;
  let httpMock: HttpTestingController;
  let spySharedService = jasmine.createSpyObj({ calculateOffset: 0 });

  const dummyGiphyData: GiphyData[] = [
    {
      id: 'WRL7YgP42OKns22wRD',
      title: 'Happy Birthday GIF by Friends',
      images: {
        original: {
          url: 'https://media0.giphy.com/media/WRL7YgP42OKns22wRD/giphy.gif?cid=c0a4e89bpjsfdwu62coh21lm4b5fbgg7ybk8oxx4c8o06aq4&rid=giphy.gif&ct=g',
        },
      },
    },
    {
      id: 'l0jEko8ebBod79syTI',
      title: 'Happy Goofy Goof GIF by Tennis TV',
      images: {
        original: {
          url: 'https://media3.giphy.com/media/l0jEko8ebBod79syTI/giphy.gif?cid=c0a4e89bpjsfdwu62coh21lm4b5fbgg7ybk8oxx4c8o06aq4&rid=giphy.gif&ct=g',
        },
      },
    },
  ];

  const dummyTags: Tag[] = [{ name: 'okay' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GiphyService,
        { provide: SharedService, useValue: spySharedService },
      ],
    });
    injector = getTestBed();
    service = injector.get(GiphyService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getGifsByPage', () => {
    it('should return an Observable<GiphyData[]>', () => {
      service.getGifsByPage().subscribe((response) => {
        const results = response['data'];
        expect(results.length).toBe(2);
        expect(results).toEqual(dummyGiphyData);
      });

      const req = httpMock.expectOne(
        `${environment.baseUrl}/trending?api_key=${
          environment.apiKey
        }&limit=${LIMIT}&offset=${spySharedService.calculateOffset(
          LIMIT,
          PAGE_NUMBER
        )}&rating=${RATING}`
      );
      expect(req.request.method).toBe('GET');
      req.flush({
        data: dummyGiphyData,
      });
    });
  });

  describe('#searchSuggestionsTags', () => {
    const dummyQuery = 'ok';
    it('should return an Observable<SearchTags>', () => {
      service.searchSuggestionsTags(dummyQuery).subscribe((response) => {
        const results = response['data'];
        expect(results.length).toBe(1);
        expect(results).toEqual(dummyTags);
      });

      const req = httpMock.expectOne(
        `${environment.baseUrl}/search/tags?api_key=${
          environment.apiKey
        }&q=${dummyQuery}&limit=${LIMIT}&offset=${spySharedService.calculateOffset(
          LIMIT,
          PAGE_NUMBER
        )}`
      );
      req.flush({
        data: dummyTags,
      });
    });
  });

  describe('#searchGifs', () => {
    const dummyQuery = 'Happy';
    it('should return an Observable<SearchGiphys>', () => {
      service.searchGifs(dummyQuery).subscribe((response) => {
        const results = response['data'];
        expect(results.length).toBe(2);
        expect(results).toEqual(dummyGiphyData);
      });

      const req = httpMock.expectOne(
        `${environment.baseUrl}/search?api_key=${
          environment.apiKey
        }&q=${dummyQuery}&limit=${LIMIT}&offset=${spySharedService.calculateOffset(
          LIMIT,
          PAGE_NUMBER
        )}&rating=${RATING}&lang=${LANG}`
      );
      req.flush({
        data: dummyGiphyData,
      });
    });
  });
});
