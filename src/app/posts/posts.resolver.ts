import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PostService } from './post.service';
import { first, map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class PostsResolver implements Resolve<boolean> {
  constructor(private postService: PostService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.postService.loaded$.pipe(
      // mergeMap((loaded) => {
      //   if (loaded) {
      //     return of(true);
      //   }
      //   return this.postService.getAll().pipe(
      //     map((posts) => {
      //       return !!posts;
      //     })
      //   );
      // }),
      // first()
      tap((loaded) => {
        if(!loaded) {
          this.postService.getAll();
        }
      }),
      first()
    );
  }
}
