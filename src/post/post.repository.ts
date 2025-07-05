import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
// 임시로 적용한 파일
// TODO: Prisma로 수정

@Injectable()
export class PostRepository {
  private posts: Post[] = [];
  private idCounter = 1;

  find(): Promise<Post[]> {
    return Promise.resolve(this.posts);
  }

  findOne({ where: { id } }: { where: { id: number } }): Promise<Post | null> {
    const post = this.posts.find((post) => post.id === id) || null;
    return Promise.resolve(post);
  }

  create(model: Omit<Post, 'id'>): Promise<Post> {
    const newPost: Post = { id: this.idCounter++, ...model };
    this.posts.push(newPost);
    return Promise.resolve(newPost);
  }

  save(post: Post): Promise<Post> {
    const index = this.posts.findIndex((p) => p.id === post.id);
    if (index !== -1) {
      this.posts[index] = post;
    } else {
      this.posts.push(post);
    }
    return Promise.resolve(post);
  }

  update(id: number, model: Partial<Omit<Post, 'id'>>): Promise<void> {
    const index = this.posts.findIndex((post) => post.id === id);
    if (index !== -1) {
      this.posts[index] = { ...this.posts[index], ...model };
    }
    return Promise.resolve();
  }

  delete(id: number): Promise<void> {
    this.posts = this.posts.filter((post) => post.id !== id);
    return Promise.resolve();
  }
}
