import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-custom-select",
  templateUrl: "./custom-select.component.html",
  styleUrls: ["./custom-select.component.scss"]
})
export class CustomSelectComponent implements OnInit {
  @Input() config: any;
  @Input() chosenValue: string;
  @Output() change = new EventEmitter();
  value: string;
  constructor() {}

  ngOnInit() {
    this.assignInitialValue();
  }

  assignInitialValue() {
    this.value = this.config.placeholder;
  }

  changeChosenValue(value) {
    this.chosenValue = value;
    let object: any = { value, function: this.config.function };
    if (this.config.connectedField)
      object.connectedField = this.config.connectedField;
    this.change.emit(object);
  }

  getChosenValueDisplayValue() {
    return this.config.values.find(element => element.value == this.chosenValue)
      .displayValue;
  }
}
