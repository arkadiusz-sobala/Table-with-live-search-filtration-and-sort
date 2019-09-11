import { ListViewComponent } from "./components/list-view/list-view.component";
import { FiltrationBarComponent } from "./components/filtration-bar/filtration-bar.component";
import { LiveSearchComponent } from "./components/live-search/live-search.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "./services/data-service";
import { Media } from "./Models/media-model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  @ViewChild("liveSearchComponent") liveSearchComponent: LiveSearchComponent;
  @ViewChild("listViewComponent") listViewComponent: ListViewComponent;
  @ViewChild("filtrationBarComponent")
  filtrationBarComponent: FiltrationBarComponent;
  title = "app";
  liveSearchConfig: any;
  filtrationBarConfig: any;
  listViewConfig: any;
  listViewData: Media[];
  data: Media[];
  searchFraze: string;
  filterField: string;
  filterValue: string;
  sortBy: string;
  sortDirection: string;
  InitialSortBy: string;

  constructor(private dataService: DataService) {}

  async ngOnInit() {
    await this.prepareComponentsConfigs();
    await this.setInitialSortBy();
    await this.setInitialSortDirection();
    await this.getData();
    await this.getFilteredAndSortedData();
  }

  async setInitialSortBy() {
    let sortSelect = this.filtrationBarConfig.selects.find(
      select => select.function == "sort"
    );
    if (sortSelect) this.InitialSortBy = sortSelect.chosenValue;
    this.sortBy = this.InitialSortBy;
  }

  async setInitialSortDirection() {
    let sortDirection = this.filtrationBarConfig.sortDirection;
    if (sortDirection) this.sortDirection = sortDirection;
    else sortDirection = "asc";
  }

  async getData() {
    this.dataService.getData().subscribe(response => {
      this.data = response;
      this.getInitialData();
    });
  }

  getInitialData() {
    console.log(this.data);

    this.listViewData = this.data.slice();
  }

  async prepareComponentsConfigs() {
    this.prepareLiveSearchConfig();
    this.prepareFiltrationBarConfig();
    this.prepareListViewConfig();
  }

  prepareLiveSearchConfig() {
    this.liveSearchConfig = {
      placeholder: "Search by tittle...",
      connectedField: "title"
    };
  }

  changeSearchParameter(value) {
    this.searchFraze = value.toLowerCase();
    this.getFilteredAndSortedData();
  }

  prepareFiltrationBarConfig() {
    this.filtrationBarConfig = {
      selects: [
        {
          placeholder: "Filter By:",
          values: [
            { displayValue: "All Media", value: "all" },
            { displayValue: "Images", value: "image" },
            { displayValue: "Documents", value: "document" },
            { displayValue: "Videos", value: "video" },
            { displayValue: "Audio", value: "audio" }
          ],
          connectedField: "type",
          function: "filter",
          chosenValue: "all"
        },
        {
          placeholder: "Sort By:",
          values: [
            { displayValue: "Date Uploaded", value: "dateUploaded" },
            { displayValue: "Alphabetical", value: "title" }
          ],
          function: "sort",
          chosenValue: "dateUploaded"
        }
      ],
      clearButton: true,
      sortDirectionButton: true,
      sortDirection: "desc"
    };
  }

  clearFiltration() {
    this.liveSearchComponent.clear();
    this.filterField = undefined;
    this.filterValue = undefined;
    this.searchFraze = undefined;
    this.sortBy = this.InitialSortBy;
    this.sortDirection = this.filtrationBarConfig.sortDirection
      ? this.filtrationBarConfig.sortDirection
      : "asc";
    this.getInitialData();
    this.getFilteredAndSortedData();
  }

  changeFiltration(event) {
    if (event.function == "filter") this.changeFilter(event);
    if (event.function == "sort") this.changeSort(event);
    this.getFilteredAndSortedData();
  }

  changeFilter(event) {
    this.filterField = event.connectedField;
    this.filterValue = event.value;
  }

  changeSort(event) {
    this.sortBy = event.value;
    this.getFilteredAndSortedData();
  }

  changeSortDirection(direction) {
    this.sortDirection = direction;
    this.getFilteredAndSortedData();
  }

  async getFilteredAndSortedData() {
    this.listViewData = this.data;
    if (this.filterField && this.filterValue)
      this.listViewData = this.filterData(this.filterField, this.filterValue);
    if (this.searchFraze)
      this.listViewData = this.filterData(
        this.liveSearchConfig.connectedField,
        this.searchFraze,
        false,
        true
      );
    this.listViewData = this.sortData();
    if (this.listViewComponent) this.listViewComponent.setPage(1);
  }

  filterData(field, value, exactValue = true, disableAllValue = false) {
    let newListViewData = [];
    for (let item of this.listViewData) {
      let valueOk = exactValue
        ? item[field] == value
        : item[field].toLowerCase().includes(value);
      if (valueOk || (value == "all" && !disableAllValue))
        newListViewData.push(item);
    }
    return newListViewData;
  }

  sortData() {
    this.listViewData.sort((a: any, b: any) => {
      a = typeof a == "string" ? a[this.sortBy].toLowerCase() : a[this.sortBy];
      b = typeof b == "string" ? b[this.sortBy].toLowerCase() : b[this.sortBy];
      if (a < b) return this.sortDirection == "asc" ? -1 : 1;
      else if (a > b) return this.sortDirection == "asc" ? 1 : -1;
      else return 0;
    });
    return this.listViewData;
  }

  prepareListViewConfig() {
    this.listViewConfig = {
      columns: [
        {
          name: "title",
          title: "Title"
        },
        {
          name: "typeName",
          title: "Type"
        },
        {
          name: "dateUploaded",
          title: "Date Uploaded",
          pipe: "date",
          datePipe: "dd.MM.yyyy"
        }
      ],
      pageCount: 15
    };
  }
}
