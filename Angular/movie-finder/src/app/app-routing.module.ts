import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleMovieResolver } from './services/resolvers/single-movie.resolver';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesComponent } from './components/movies/movies.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'movies'},
  {path: 'movies', component: MoviesComponent},
  {path: 'movies/search', component: MovieSearchComponent},
  {path: 'movies/:id', component: MovieDetailsComponent, resolve: {singleMovie: SingleMovieResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
