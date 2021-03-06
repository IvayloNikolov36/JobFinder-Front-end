import { Component, Input, EventEmitter, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-app-pagination',
  templateUrl: './app-pagination.component.html',
  styleUrls: ['./app-pagination.component.css']
})
export class AppPaginationComponent implements OnChanges {
  @Input() totalRecords = 0;
  @Input() recordsPerPage = 0;
  @Input() activePage = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  pages: number[] = [];

  ngOnChanges() {
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
  }

  private getPageCount(): number {
    let totalPage = 0;
    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount = this.totalRecords / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);
      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return totalPage;
  }

  private getArrayOfPage(pageCount: number): number[] {
    const pageArray: number [] = [];
    if (pageCount > 0) {
        for (let i = 1 ; i <= pageCount ; i++) {
          pageArray.push(i);
        }
    }

    return pageArray;
  }

  onClickPage(pageNumber: number): void {
      if (pageNumber < 1) {
        return;
      }
      if (pageNumber > this.pages.length) {
        return;
      }
      this.activePage = pageNumber;
      this.pageChange.emit(this.activePage);
  }

}
