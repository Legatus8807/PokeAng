import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { DbPokemon } from '../DbPokemon';

@Injectable({
  providedIn: 'root'
})
export class SubService {
  private lengthSub = new Subject<number>();

  constructor() { }

  updateLength():Subject<number> {
    return this.lengthSub;
  }

  getLength():Observable<number> {
    return this.lengthSub.asObservable();
  }
}
