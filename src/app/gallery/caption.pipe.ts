import { Pipe, PipeTransform } from '@angular/core';
import { IGalleryItem } from '../shared/types';

@Pipe({
  name: 'caption',
})
export class CaptionPipe implements PipeTransform {

  transform(value: IGalleryItem): string {
    if (value) {
      return `${value.name} &nbsp;-&nbsp; ${value.width}”x${value.height}”<span>${value.sold ? 'Sold' : '$' + value.price}</span>`;
    }
  }

}
