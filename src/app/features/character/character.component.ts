import { Component, Input } from '@angular/core';
import { StarWarsCharacter } from '../../shared/interfaces/character.interface';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent {
  @Input()
  character!: StarWarsCharacter;
}
