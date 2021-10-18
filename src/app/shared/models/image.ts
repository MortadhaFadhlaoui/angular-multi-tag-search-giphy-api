export class Image {
  id: number;
  title: string;
  url: string;
  constructor();
  constructor(image?: any) {
    this.id = (image && image.id) || null;
    this.title = (image && image.title) || '';
    this.url = (image && image.url) || '';
  }
}
