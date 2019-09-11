import { ComponentsModule } from "./components/components.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { DataService } from "./services/data-service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ComponentsModule],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
