import { Injectable } from '@angular/core';
import { GiphyData } from '../models/giphy-data';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  parseGifs(gifs: GiphyData[]): Image[] {
    const images: Image[] = gifs.map(
      (gif) =>
        <Image>{
          id: gif.id,
          title: gif.title,
          url: gif.images.original.url,
        }
    );
    return images;
  }

  calculateOffset(limit: number, pageNumber: number) {
    return limit * pageNumber;
  }
}
