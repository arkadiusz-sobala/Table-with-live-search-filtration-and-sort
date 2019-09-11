import { DATA } from "./../constants";
import { Observable } from "rxjs/Observable";
import { Media } from "../Models/media-model";

export class DataService {
  constructor() {}

  getData(): Observable<Media[]> {
    let observable = new Observable<Media[]>(observer => {
      observer.next(DATA);
    });
    return observable;
  }
}
