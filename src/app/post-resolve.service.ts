import { Injectable } from '@angular/core';

import { BlogService } from './blog.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable()
export class PostResolveService implements Resolve<any> {

  constructor(private blogService: BlogService) { }

  /**
   * Blog Post Data Resolver.
   * returns 1 post object
   *
   * @returns Observable<any> - resolve: postData <object>
   *
   */
  resolve(route: ActivatedRouteSnapshot): Observable<object> {
    const postId = route.params.id;
    console.log('getting post with id: ', postId);
    return this.blogService.getPost(postId);

  }
}

