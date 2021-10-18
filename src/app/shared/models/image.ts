export class Image {
  id: string;
  title: string;
  url: string;
  constructor();
  constructor(image?: any) {
    this.id = (image && image.id) || '';
    this.title = (image && image.title) || '';
    this.url = (image && image.url) || '';
  }
}
