import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DocumentService } from 'src/app/shared/services/document.service';
import { IGalleryItem, IOrderEntry } from 'src/app/shared/types';

@Component({
  selector: 'app-sort-dialog',
  templateUrl: './sort-dialog.component.html',
  styleUrls: ['./sort-dialog.component.scss'],
})
export class SortDialogComponent implements OnInit, OnDestroy {

  list: IOrderEntry[];
  gallery: IGalleryItem[];

  unsubscribe$ = new Subject();

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentService.order$.pipe(takeUntil(this.unsubscribe$)).subscribe(settings => {
      this.list = settings.value;
    });
    this.documentService.gallery$.pipe(takeUntil(this.unsubscribe$)).subscribe(items => {
      this.gallery = items;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
