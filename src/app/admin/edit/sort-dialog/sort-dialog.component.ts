import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/shared/services/document.service';
import { IGalleryItem, IOrderEntry } from 'src/app/shared/types';

@Component({
  selector: 'app-sort-dialog',
  templateUrl: './sort-dialog.component.html',
  styleUrls: ['./sort-dialog.component.scss'],
})
export class SortDialogComponent implements OnInit {

  list: IOrderEntry[];
  gallery: IGalleryItem[];

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentService.order$.subscribe(settings => {
      this.list = settings.value;
    });
    this.documentService.gallery$.subscribe(items => {
      this.gallery = items;
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
    try {
      this.documentService.setOrder(this.list);
    } catch (error) {
      console.log(error);
    }
  }

}
