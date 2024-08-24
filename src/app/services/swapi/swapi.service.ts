import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../request.service';
import { CharacterResponse } from '../../shared/interfaces/character.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SwapiService extends RequestService {
  private url = 'https://swapi.dev/api/';

  getCharacters(page: number): Observable<CharacterResponse> {
    let params = new HttpParams().set('page', page.toString());
    return this.get(this.url + 'people', params);
  }
}
