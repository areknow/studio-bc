import { Pipe, PipeTransform } from '@angular/core';
import { IGalleryItem } from 'src/app/shared/types';

@Pipe({
  name: 'item',
})
export class ItemPipe implements PipeTransform {

  transform(gallery: IGalleryItem[], id: string): IGalleryItem {
    if (gallery && id) {
      return gallery.find(item => item.id === id);
    }
  }

}
