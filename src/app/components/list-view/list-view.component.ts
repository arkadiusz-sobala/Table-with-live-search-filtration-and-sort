import { Media } from "./../../Models/media-model";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-list-view",
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.scss"]
})
export class ListViewComponent implements OnInit {
  @Input() config: any;
  @Input() data: Media[];
  currentPage: number = 1;
  pageCount: number;
  notFound: any = {
    item: { data: "No data found" },
    columns: [{ name: "data" }]
  };
  tableHeader: any = {};
  constructor() {}

  ngOnInit() {
    this.setTableHeader();

    this.setPageCount();
  }

  setTableHeader() {
    for (let column of this.config.columns) {
      this.tableHeader[column.name] = column.title;
    }
  }

  setPageCount() {
    this.pageCount = this.config.pageCount ? this.config.pageCount : 10;
  }

  getItemClass(itemIndex) {
    let className = " ";
    if (this.isDisplayed(itemIndex)) className += " item-border";
    if (
      itemIndex != this.pageCount * this.currentPage - 1 &&
      itemIndex + 1 != this.data.length
    )
      className += " no-bottom-border";
    return className;
  }

  isDisplayed(itemIndex) {
    if (
      itemIndex >= this.pageCount * (this.currentPage - 1) &&
      itemIndex < this.pageCount * this.currentPage
    )
      return true;
    else return false;
  }

  getCurrentlyShownCount() {
    if (this.currentPage * this.pageCount >= this.data.length)
      return `${this.pageCount * (this.currentPage - 1) + 1} - ${
        this.data.length
      } / ${this.data.length}`;
    else
      return `${this.pageCount * (this.currentPage - 1) + 1} - ${this
        .currentPage * this.pageCount} / ${this.data.length}`;
  }

  getPage() {
    return `${this.currentPage} / ${this.getPagesCount()}`;
  }

  getPagesCount() {
    return Math.ceil(this.data.length / this.pageCount);
  }

  setPage(number) {
    this.currentPage = number;
  }
}
