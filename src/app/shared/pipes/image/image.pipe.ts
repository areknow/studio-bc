import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {

  transform(imageRef: string, type: 'img'|'div'): string {
    const url = `https://firebasestorage.googleapis.com/v0/b/studio-bc.appspot.com/o/${imageRef}?alt=media`;
    if (type === 'img') {
      return url;
    } else if (type === 'div') {
      return `url(${url})`;
    }
  }

}
