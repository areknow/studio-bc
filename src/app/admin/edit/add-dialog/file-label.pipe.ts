import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileLabel',
})
export class FileLabelPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      return value.replace(/C:\\fakepath\\/i, '');
    }
  }

}
