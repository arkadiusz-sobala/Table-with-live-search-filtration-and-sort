import { Media } from "./../../../Models/media-model";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-list-item",
  templateUrl: "./list-item.component.html",
  styleUrls: ["./list-item.component.scss"]
})
export class ListItemComponent implements OnInit {
  @Input() item: Media;
  @Input() columns: any[];
  @Input() align: string;
  @Input() header: boolean;
  constructor() {}

  ngOnInit() {}

  getColumnClass(columnIndex) {
    let className = "column";
    if (columnIndex + 1 != this.columns.length) className += " right-border";
    return className;
  }

  getAlignClass() {
    if (this.align == "center") return "center-align";
    else if (this.align == "right") return "left-align";
    else return "left-align";
  }
}
