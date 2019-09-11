import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  EventEmitter,
  Output
} from "@angular/core";

@Component({
  selector: "app-filtration-bar",
  templateUrl: "./filtration-bar.component.html",
  styleUrls: ["./filtration-bar.component.scss"]
})
export class FiltrationBarComponent implements OnInit, AfterViewInit {
  @Input() clearButton: boolean;
  @Input() sortDirectionButton: boolean;
  @Input() selects: any[];
  @Input() sortDirection: string = "asc";
  @Output() clear = new EventEmitter();
  @Output() filtrationChange = new EventEmitter();
  @Output() sortDirectionChange = new EventEmitter();
  initailSelectsValues: any[];
  initialSortDirection: string;
  constructor() {}

  ngOnInit() {
    this.setInitialSortDirection();
  }

  setInitialSortDirection() {
    this.initialSortDirection = this.sortDirection;
  }

  ngAfterViewInit() {
    this.saveInitialSelectsValues();
  }

  saveInitialSelectsValues() {
    this.initailSelectsValues = [];
    for (let element of this.selects)
      this.initailSelectsValues.push(element.chosenValue);
  }

  changeFiltration(event, selectIndex) {
    this.selects[selectIndex].chosenValue = event.value;
    this.filtrationChange.emit(event);
  }

  clearFiltration() {
    let index = 0;
    for (let element of this.selects) {
      element.chosenValue = this.initailSelectsValues[index];
      index++;
    }
    this.sortDirection = this.initialSortDirection;
    this.clear.emit();
  }

  changeSortDirection() {
    this.sortDirection = this.sortDirection == "asc" ? "desc" : "asc";
    this.sortDirectionChange.emit(this.sortDirection);
  }
}
