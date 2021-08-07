import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signIn() {
    this.authService
    .login(this.loginForm.value)
      .subscribe((data) => {
      localStorage.setItem('token', data['token']);
      localStorage.setItem('name' , data['user']['name']);
      this.router.navigate([ '/home' ])
    });
  }

}