import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import MovieDetails from 'src/app/models/Movie-Details';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  id: string;
  movie: MovieDetails;
  movieGenres: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.movie = this.route.snapshot.data['singleMovie'];
    this.movieGenres = this.movie.genres.map(el => el['name']).join(' ')

    //  this.id = this.route.snapshot.params['id'];
    // this.route.params.subscribe((params: Params) => {
    //   this.id = params['id'];
    // });
    // this.movieService.getMovieById(this.id).subscribe((data) => {
    //   this.movie = data;
    //   this.movieGenres = this.movie.genres.map(el => el['name']).join(' ')
    // });
  }

}
