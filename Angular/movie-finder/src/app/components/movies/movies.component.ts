import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Movie from 'src/app/models/Movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {
  popularMovies: Movie[];
  inTheatreMovies: Movie[];
  popularKidsMovies: Movie[];
  bestDramaMovies: Movie[];

  popularMoviesSub: Subscription;

  constructor(private moviesService: MovieService) { }

  ngOnInit() {
    this.popularMoviesSub = this.moviesService.getPopularMovies().subscribe(data => {
      this.popularMovies = data;
    });
    this.moviesService.getInTheaterMovies().subscribe(data => {
      this.inTheatreMovies = data;
    });
    this.moviesService.getPopularKidsMovies().subscribe(data => {
      this.popularKidsMovies = data;
    });
    this.moviesService.getBestDramaMovies().subscribe(data => {
      this.bestDramaMovies = data;
    });
  }

  ngOnDestroy() {
    this.popularMoviesSub.unsubscribe();
  }

}
