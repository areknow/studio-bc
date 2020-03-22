import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component } from '@angular/core';
import Chocolat from 'chocolat';
import Macy from 'macy';
import { AdminService } from '../admin/admin.service';
import { DocumentService } from '../shared/services/document.service';
import { IGalleryItem } from '../shared/types';

const MASONRY_CLASS = '.masonry';

const CHOCOLAT_OPTIONS = {
  fullScreen: null,
  loop: true,
};

const MACY_OPTIONS = {
  container: MASONRY_CLASS,
  columns: 4,
  trueOrder: true,
  margin: { y: 30, x: 30 },
  breakAt: {
    940: {
      margin: { x: 10, y: 10 },
      columns: 3,
    },
    620: 2,
    370: 1,
  },
};

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {

  macyInstance: Macy;
  chocolatInstance: Chocolat;

  items: IGalleryItem[] = [];
  loading = true;

  order: any;

  get isLoggedIn(): boolean {
    return this.adminService.loggedIn;
  }

  constructor(
    private adminService: AdminService,
    private documentService: DocumentService,
  ) {
    // React to grid values
    this.documentService.gallery$.subscribe(items => {
      this.items = items;
      setTimeout(() => {
        if (this.chocolatInstance) {
          this.chocolatInstance.api().destroy();
          this.initChocolat();
          this.sortArray();
        }
        this.renderGrid();
      }, 0);
    });
    // React to grid order
    this.documentService.order$.subscribe(items => {
      this.order = items.value;
      this.sortArray();
    });
  }

  sortArray(): void {
    const orderedGrid = [];
    for (const orderEntry of this.order) {
      orderedGrid.push(this.items.find(item => item.id === orderEntry.id));
    }
    this.items = orderedGrid;
    if (this.macyInstance) {
      setTimeout(() => {
        this.chocolatInstance.api().destroy();
        this.initChocolat();
        this.macyInstance.reInit();
      }, 0);
    }
  }

  renderGrid(): void {
    // Grid rendering is not necessary under auth redirect circumstances
    const redirect = coerceBooleanProperty(sessionStorage.getItem('redirect'));
    if (!redirect) {
      this.macyInstance = new Macy(MACY_OPTIONS);
      this.initChocolat();
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  }

  initChocolat(): void {
    this.chocolatInstance = $(MASONRY_CLASS).Chocolat(CHOCOLAT_OPTIONS).data('chocolat');
  }

}
