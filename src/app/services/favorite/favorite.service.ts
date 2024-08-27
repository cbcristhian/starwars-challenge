import { Injectable, signal } from '@angular/core';
import { StarWarsCharacter } from '../../shared/interfaces/character.interface';
import { Utils } from '../../shared/Utils';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoriteList = signal<StarWarsCharacter[]>([]);

  constructor() {
    this.loadFavorites();
  }

  getFavorites() {
    return this.favoriteList();
  }

  addOrRemoveFavorite(character: StarWarsCharacter) {
    let favorites = this.favoriteList();
    const index = favorites.findIndex(fav => fav.name === character.name);
    if (index === -1) {
      favorites.push(character);
    } else {
      favorites.splice(index, 1);
    }
    this.favoriteList.set(favorites);
    Utils.set('favorite', JSON.stringify(favorites));
  }

  removeFavorite(character: StarWarsCharacter) {
    let favorites = this.favoriteList();
    const index = favorites.findIndex(fav => fav.name === character.name);
    if (index !== -1) {
      favorites.splice(index, 1);
    }
    this.favoriteList.set(favorites);
    Utils.set('favorite', JSON.stringify(favorites));
  }

  private loadFavorites() {
    this.favoriteList.set(JSON.parse(Utils.get('favorite') || '[]'));
  }

  isFavorite(character: StarWarsCharacter): boolean {
    return this.favoriteList().some(fav => fav.name === character.name);
  }
}
