export class Image {
  id: number;
  title: String;
  url: String;
  constructor();
  constructor(image?: any) {
    this.id = (image && image.id) || null;
    this.title = (image && image.title) || '';
    this.url = (image && image.url) || '';
  }
}
