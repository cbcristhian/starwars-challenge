import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListComponent } from './character-list.component';
import { SwapiService } from '../../services/swapi/swapi.service';
import { of } from 'rxjs';
import {
  CharacterResponse,
  StarWarsCharacter,
} from '../../shared/interfaces/character.interface';
import { Utils } from '../../shared/Utils';
import { FavoriteService } from '../../services/favorite/favorite.service';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let swapiService: jasmine.SpyObj<SwapiService>;
  let favoriteService: jasmine.SpyObj<FavoriteService>;

  const mockCharacter: StarWarsCharacter = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'Tatooine',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: new Date(),
    edited: new Date(),
    url: 'https://swapi.dev/api/people/1/',
  };

  beforeEach(async () => {
    const swapiServiceSpy = jasmine.createSpyObj('SwapiService', [
      'getCharacters',
    ]);
    const favoriteServiceSpy = jasmine.createSpyObj('FavoriteService', [
      'isFavorite',
      'addOrRemoveFavorite',
    ]);
    await TestBed.configureTestingModule({
      declarations: [CharacterListComponent],
      providers: [
        { provide: SwapiService, useValue: swapiServiceSpy },
        { provide: FavoriteService, useValue: favoriteServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    swapiService = TestBed.inject(SwapiService) as jasmine.SpyObj<SwapiService>;
    favoriteService = TestBed.inject(
      FavoriteService
    ) as jasmine.SpyObj<FavoriteService>;

    swapiService.getCharacters.and.returnValue(
      of({
        count: 1,
        next: 'next-url',
        previous: 'previous-url',
        results: [
          {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
            homeworld: 'Tatooine',
            films: [],
            species: [],
            vehicles: [],
            starships: [],
            created: new Date(),
            edited: new Date(),
            url: '',
          },
        ],
      })
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load characters on init', () => {
    const mockResponse = {
      count: 1,
      next: 'next-url',
      previous: 'previous-url',
      results: [mockCharacter],
    };
    swapiService.getCharacters.and.returnValue(of(mockResponse));

    component.ngOnInit(); // Calls loadCharacters internally

    expect(component.characterList.length).toBe(1);
    expect(component.nextUrl).toBe('next-url');
    expect(component.previousUrl).toBe('previous-url');
    expect(component.loading).toBeFalse();
  });

  it('should load the next page of characters', () => {
    const mockResponse = {
      count: 1,
      next: 'next-url',
      previous: 'previous-url',
      results: [mockCharacter],
    };
    swapiService.getCharacters.and.returnValue(of(mockResponse));

    component.nextUrl = 'next-url';
    component.loadNextPage();

    expect(component.currentPage).toBe(2);
    expect(swapiService.getCharacters).toHaveBeenCalledWith(2);
  });

  it('should load the previous page of characters', () => {
    const mockResponse = {
      count: 1,
      next: 'next-url',
      previous: 'previous-url',
      results: [mockCharacter],
    };
    swapiService.getCharacters.and.returnValue(of(mockResponse));

    component.previousUrl = 'previous-url';
    component.currentPage = 2;
    component.loadPreviousPage();

    expect(component.currentPage).toBe(1);
    expect(swapiService.getCharacters).toHaveBeenCalledWith(1);
  });

  it('should check if a character is a favorite', () => {
    favoriteService.isFavorite.and.returnValue(true);

    expect(component.isFavorite(mockCharacter)).toBeTrue();
    expect(favoriteService.isFavorite).toHaveBeenCalledWith(mockCharacter);
  });

  it('should add or remove a character from favorites', () => {
    component.addToFavorite(mockCharacter);

    expect(favoriteService.addOrRemoveFavorite).toHaveBeenCalledWith(
      mockCharacter
    );
  });
});
