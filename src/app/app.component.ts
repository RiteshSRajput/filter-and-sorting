import { Component, QueryList, ViewChildren } from '@angular/core';
import { dataset } from './data';
import {
  SortableHeaderDirective,
  SortEvent,
  compare,
} from './sortable-header.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  filter: string;
  data: Array<any> = dataset;
  sorting: Array<any> = dataset;

  @ViewChildren(SortableHeaderDirective)
  headers: QueryList<SortableHeaderDirective>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting
    if (direction === '' || column === '') {
      this.sorting = this.data;
    } else {
      debugger;
      this.sorting = [...this.data].sort((a, b) => {
        if (column === 'created' || column === 'modified') {
          a[column] = new Date(a[column]);
          b[column] = new Date(b[column]);
        }
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
