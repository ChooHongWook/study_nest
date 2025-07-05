import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findOne(id: number): Promise<Post | null> {
    return await this.postRepository.findOne({ where: { id } });
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = await this.postRepository.create(createPostDto);
    return await this.postRepository.save(post);
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post | null> {
    await this.postRepository.update(id, updatePostDto);
    return await this.postRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
