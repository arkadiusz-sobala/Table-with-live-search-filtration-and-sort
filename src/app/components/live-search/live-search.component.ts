import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-live-search",
  templateUrl: "./live-search.component.html",
  styleUrls: ["./live-search.component.scss"]
})
export class LiveSearchComponent implements OnInit {
  @Input() placeholder: string;
  @Output() searchChange = new EventEmitter();
  searchValue: string = "";
  constructor() {}

  ngOnInit() {}

  emitSearchChange(event) {
    if (
      event &&
      event.target &&
      (event.target.value || event.target.value == "")
    ) {
      this.searchValue = event.target.value;
      this.searchChange.emit(event.target.value);
    }
  }

  clear() {
    this.searchValue = "";
  }
}
