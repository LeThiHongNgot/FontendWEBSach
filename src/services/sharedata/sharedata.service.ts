import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedataService {

  private itemIdSource = new BehaviorSubject<string | undefined>(undefined);
  currentItemId = this.itemIdSource.asObservable();

  changeItemId(newItemId: string) {
    this.itemIdSource.next(newItemId);
  }
}
