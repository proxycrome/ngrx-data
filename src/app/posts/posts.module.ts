import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsResolver } from './posts.resolver';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from '@ngrx/data';
import { PostsDataService } from './posts-data.service';
import { Post } from '../models/post.model';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    resolve: { posts: PostsResolver },
  },
  { path: 'add', component: AddPostComponent },
  {
    path: 'edit/:id',
    component: EditPostComponent,
    resolve: { posts: PostsResolver },
  },
  {
    path: 'details/:id',
    component: SinglePostComponent,
    resolve: { posts: PostsResolver },
  },
];

export function sortByName(a: Post, b: Post): number {
    const compare = a.title.localeCompare(b.title);
    // sort in descending order
    if (compare > 0) return -1;
    if (compare < 0) return 1;
    return compare;
  }

const entityMetadata: EntityMetadataMap = {
  Post: {
    sortComparer: sortByName,
    entityDispatcherOptions: {
      optimisticUpdate: true, // The post updates in the store before it updates the server
      optimisticDelete: false, // false causes it to delete in the server before deleting in the store
    },
  },
};

@NgModule({
  declarations: [
    PostsListComponent,
    AddPostComponent,
    EditPostComponent,
    SinglePostComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
  providers: [PostsResolver, PostsDataService],
})
export class PostsModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    postsDataService: PostsDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Post', postsDataService);
  }
}
