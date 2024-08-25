import { Component, OnInit } from '@angular/core';
import { StarWarsCharacter } from '../../shared/interfaces/character.interface';
import { Utils } from '../../shared/Utils';

@Component({
  selector: 'app-favorite-characters',
  templateUrl: './favorite-characters.component.html',
  styleUrl: './favorite-characters.component.scss',
})
export class FavoriteCharactersComponent implements OnInit {
  characterList: StarWarsCharacter[] = [];

  ngOnInit(): void {
    this.characterList = JSON.parse(Utils.get('favorite') || '[]');
  }
}
