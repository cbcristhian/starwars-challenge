import { Component, OnInit, signal } from '@angular/core';
import { StarWarsCharacter } from '../../shared/interfaces/character.interface';
import { Utils } from '../../shared/Utils';
import { FavoriteService } from '../../services/favorite/favorite.service';

@Component({
  selector: 'app-favorite-characters',
  templateUrl: './favorite-characters.component.html',
  styleUrl: './favorite-characters.component.scss',
})
export class FavoriteCharactersComponent {
  favoriteList: StarWarsCharacter[] = [];
  constructor(private favoriteService: FavoriteService) {
    this.favoriteList = this.favoriteService.getFavorites();
  }

  removeFavorite(character: StarWarsCharacter) {
    this.favoriteService.removeFavorite(character);
  }
}
