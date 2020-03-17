import { Pipe, PipeTransform } from '@angular/core';
import { IGalleryItem } from '../admin/edit/edit.component';

@Pipe({
  name: 'caption',
})
export class CaptionPipe implements PipeTransform {

  transform(value: IGalleryItem): string {
    return `${value.name} - ${value.width}x${value.height}” - ${value.sold ? 'Sold' : '$' + value.price}`;
  }

}
