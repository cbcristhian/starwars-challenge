import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SwapiService } from '../../services/swapi/swapi.service';
import { StarWarsCharacter } from '../../shared/interfaces/character.interface';
import { FavoriteService } from '../../services/favorite/favorite.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent implements OnInit, OnDestroy {
  favoriteList: StarWarsCharacter[] = [];
  characterList: StarWarsCharacter[] = [];
  nextUrl: string | null = null;
  previousUrl: string | null = null;
  currentPage = 1;
  loading = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private swapiService: SwapiService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.loadCharacters();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadCharacters() {
    this.loading = true;
    this.swapiService
      .getCharacters(this.currentPage)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: Response => {
          this.characterList = Response.results;
          this.nextUrl = Response.next;
          this.previousUrl = Response.previous;
          this.loading = false;
        },
        error: error => {
          console.log(error);
        },
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

  isFavorite(character: StarWarsCharacter): boolean {
    return this.favoriteService.isFavorite(character);
  }

  addToFavorite(character: StarWarsCharacter) {
    this.favoriteService.addOrRemoveFavorite(character);
  }
}
