import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './features/character-list/character-list.component';
import { FavoriteCharactersComponent } from './features/favorite-characters/favorite-characters.component';

const routes: Routes = [
  { path: '', component: CharacterListComponent },
  { path: 'favorites', component: FavoriteCharactersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
