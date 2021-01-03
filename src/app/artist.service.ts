import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts?';
  private commentsUrl = 'https://jsonplaceholder.typicode.com/comments?';

  constructor(private http: HttpClient) { }

  getUsers (): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl)
      .pipe(
        tap(_ => console.log('fetched users'))
      );
  }

  getPosts(userId:number): Observable<any[]> {
    return this.http.get<any[]>(this.postsUrl + 'userId=' + userId)
      .pipe(
        tap(_ => console.log('fetched posts'))
      );
  }

  getComments(postId:number): Observable<any[]> {
    return this.http.get<any[]>(this.commentsUrl + 'postId=' + postId)
      .pipe(
        tap(_ => console.log('fetched comments'))
      );
  }
}
