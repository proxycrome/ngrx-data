import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Post } from '../models/post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpOptions } from '@ngrx/data/src/dataservices/interfaces';
import { Update } from '@ngrx/entity';

@Injectable()
export class PostsDataService extends DefaultDataService<Post> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  override getAll(): Observable<Post[]> {
    return this.http
      .get<Post[]>(
        'https://ngrx-complete-course-83177-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((data) => {
          let posts: Post[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  override add(post: Post): Observable<Post> {
    return this.http
      .post<{ name: string }>(
        'https://ngrx-complete-course-83177-default-rtdb.firebaseio.com/posts.json',
        post
      )
      .pipe(
        map((data) => {
          return { ...post, id: data.name };
        })
      );
  }

  override update(post: Update<Post>): Observable<Post> {
    return this.http.post<Post>(
      `https://ngrx-complete-course-83177-default-rtdb.firebaseio.com/posts/${post.id}.json`,
      { ...post.changes }
    );
  }

  override delete(id: string): Observable<string> {
    return this.http.delete(
      `https://ngrx-complete-course-83177-default-rtdb.firebaseio.com/posts/${id}.json`
    ).pipe(map(data => {
      return id;
    }));
  }
}
