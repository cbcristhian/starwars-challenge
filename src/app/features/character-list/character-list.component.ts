import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SwapiService } from '../../services/swapi/swapi.service';
import { StarWarsCharacter } from '../../shared/interfaces/character.interface';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Utils } from '../../shared/Utils';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent implements OnInit, OnDestroy {
  favoriteList: StarWarsCharacter[] = [];
  characterList: StarWarsCharacter[] = [];
  filteredCharacterList: StarWarsCharacter[] = [];
  nextUrl: string | null = null;
  previousUrl: string | null = null;
  currentPage = 1;
  loading = false;

  characterForm!: FormGroup;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private swapiService: SwapiService,
    private favoriteService: FavoriteService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.characterForm = this.fb.group({
      searchTerm: [Utils.get('searchTerm') ?? ''],
    });
    this.loadCharacters();

    this.characterForm.valueChanges.subscribe(filters => {
      Utils.set('searchTerm', filters.searchTerm);
      this.filterCharacters(filters.searchTerm);
    });
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
          this.filterCharacters(this.characterForm.get('searchTerm')?.value);
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

  filterCharacters(searchTerm: string): void {
    let filtered = this.characterList;
    if (searchTerm) {
      filtered = filtered.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    this.filteredCharacterList = filtered;
  }
}
