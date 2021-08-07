import { Injectable } from '@angular/core';
import { UserModule } from './user.module';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  load() {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/users');
  }
}
