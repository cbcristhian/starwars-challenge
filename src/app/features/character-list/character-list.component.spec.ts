import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListComponent } from './character-list.component';
import { SwapiService } from '../../services/swapi/swapi.service';
import { of } from 'rxjs';
import {
  CharacterResponse,
  StarWarsCharacter,
} from '../../shared/interfaces/character.interface';
import { Utils } from '../../shared/Utils';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let swapiService: jasmine.SpyObj<SwapiService>;

  beforeEach(async () => {
    const swapiServiceSpy = jasmine.createSpyObj('SwapiService', [
      'getCharacters',
    ]);
    await TestBed.configureTestingModule({
      declarations: [CharacterListComponent],
      providers: [{ provide: SwapiService, useValue: swapiServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    swapiService = TestBed.inject(SwapiService) as jasmine.SpyObj<SwapiService>;

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

  it('should create the component and load characters on init', () => {
    expect(component).toBeTruthy();

    component.ngOnInit(); // Calls loadCharacters internally

    expect(component.characterList.length).toBe(1);
    expect(component.loading).toBeFalse();
    expect(swapiService.getCharacters).toHaveBeenCalledWith(
      component.currentPage
    );
  });

  it('should load characters and set properties correctly', () => {
    const mockResponse: CharacterResponse = {
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
    };
    swapiService.getCharacters.and.returnValue(of(mockResponse));

    component.loadCharacters();

    expect(component.characterList).toEqual(mockResponse.results);
    expect(component.nextUrl).toBe(mockResponse.next);
    expect(component.previousUrl).toBe(mockResponse.previous);
    expect(component.loading).toBeFalse();
  });
  it('should load the next page', () => {
    spyOn(component, 'loadCharacters');
    component.nextUrl = 'next-url';

    component.loadNextPage();

    expect(component.currentPage).toBe(2);
    expect(component.loadCharacters).toHaveBeenCalled();
  });

  it('should not load the next page if nextUrl is null', () => {
    spyOn(component, 'loadCharacters');
    component.nextUrl = null;

    component.loadNextPage();

    expect(component.currentPage).toBe(1);
    expect(component.loadCharacters).not.toHaveBeenCalled();
  });

  it('should add character to favorite', () => {
    const character = { name: 'Luke Skywalker' } as StarWarsCharacter;
    spyOn(Utils, 'get').and.returnValue('[]');
    spyOn(Utils, 'set');

    component.addToFavorite(character);

    expect(Utils.set).toHaveBeenCalledWith(
      'favorite',
      JSON.stringify([character])
    );
  });

  it('should not add duplicate character to favorite', () => {
    const character = { name: 'Luke Skywalker' } as StarWarsCharacter;
    spyOn(Utils, 'get').and.returnValue(JSON.stringify([character]));
    spyOn(Utils, 'set');

    component.addToFavorite(character);

    expect(Utils.set).not.toHaveBeenCalled();
  });
});
