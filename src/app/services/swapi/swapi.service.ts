import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../request.service';

@Injectable({
  providedIn: 'root',
})
export class SwapiService extends RequestService {
  private url = 'https://swapi.dev/api/';

  getCharacters(): Observable<any> {
    return this.get(this.url + 'people/');
  }
}
