import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {

  transform(imageRef: string): string {
    return `url(https://firebasestorage.googleapis.com/v0/b/studio-bc.appspot.com/o/${imageRef}?alt=media)`;
  }

}
