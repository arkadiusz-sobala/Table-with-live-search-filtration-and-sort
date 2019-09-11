import { LiveSearchComponent } from "./live-search/live-search.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FiltrationBarComponent } from "./filtration-bar/filtration-bar.component";
import { ListViewComponent } from "./list-view/list-view.component";
import { CustomSelectComponent } from "./filtration-bar/custom-select/custom-select.component";
import { ListItemComponent } from "./list-view/list-item/list-item.component";

export const COMPONENTS = [
  LiveSearchComponent,
  FiltrationBarComponent,
  ListViewComponent,
  CustomSelectComponent,
  ListItemComponent
];
@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class ComponentsModule {}
