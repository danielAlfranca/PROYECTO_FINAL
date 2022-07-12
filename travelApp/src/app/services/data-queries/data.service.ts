import { Injectable } from '@angular/core';
import { DataStoreService } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private dataStore:DataStoreService) { }
}
