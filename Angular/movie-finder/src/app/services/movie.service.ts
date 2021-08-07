import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import Movie from '../models/Movie';
import MovieDetails from '../models/Movie-Details';

const BASE_URL = 'https://api.themoviedb.org/3/';
const IN_THEATRES = 'discover/movie?primary_release_date.gte=2019-03-01&primary_release_date.lte=2019-04-30';
const POPULAR = 'discover/movie?sort_by=popularity.desc';
const KIDS = 'discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc';
const BEST_DRAMA = 'discover/movie?with_genres=18&primary_release_year=2019';

const API_KEY = '&api_key=71662074f2d08a6dab35ae15c170e483';
const API_KEY_ALT = '?api_key=71662074f2d08a6dab35ae15c170e483';

// const BASE_URL = 'https://api.themoviedb.org/3/movie';
// const IN_THEATRES = 'https://api.themoviedb.org/3/discover/movie'
// const API_KEY = '?api_key=71662074f2d08a6dab35ae15c170e483';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  constructor(private http: HttpClient) { }

  getPopularMovies() {
    return this.http.get<Movie[]>(BASE_URL + POPULAR + API_KEY)
    .pipe(
      map((data) => data['results'].slice(0,6))
    );
  }

  getInTheaterMovies() {
    return this.http.get<Movie[]>(BASE_URL + IN_THEATRES + API_KEY)
    .pipe(
      map((data) => data['results'].slice(0,6))
    );
  }

  getPopularKidsMovies() {
    return this.http.get<Movie[]>(BASE_URL + KIDS + API_KEY)
    .pipe(
      map((data) => data['results'].slice(0,6))
    );
  }

  getBestDramaMovies() {
    return this.http.get<Movie[]>(BASE_URL + BEST_DRAMA + API_KEY)
    .pipe(
      map((data) => data['results'].slice(0,6))
    );
  }

  getMovieById(id: string) {
    return this.http.get<MovieDetails>(BASE_URL + `movie/${id}` + API_KEY_ALT);
  }

  searchMovie(query: string){
    return this.http.get<Movie[]>(BASE_URL + 'search/movie' + API_KEY_ALT + `&query=${query}`);
  }
}
