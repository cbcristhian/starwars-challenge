import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../../services/swapi/swapi.service';
import { StarWarsCharacter } from '../../shared/interfaces/character.interface';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent implements OnInit {
  characterList: StarWarsCharacter[] = [];
  nextUrl: string | null = null;
  previousUrl: string | null = null;
  currentPage = 1;
  loading = false;

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters() {
    this.loading = true;
    this.swapiService.getCharacters(this.currentPage).subscribe(Response => {
      this.characterList = Response.results;
      this.nextUrl = Response.next;
      this.previousUrl = Response.previous;
      this.loading = false;
    });
  }

  loadNextPage(): void {
    if (this.nextUrl) {
      this.currentPage++;
      this.loadCharacters();
    }
  }

  loadPreviousPage(): void {
    if (this.previousUrl) {
      this.currentPage--;
      this.loadCharacters();
    }
  }
}
