import { CreateBlogDto } from "../../dtos/blog/CreateBlogDto";
import { UpdateBlogDto } from "../../dtos/blog/UpdateBlogDto";
import { Blog } from "../entities/Blog";

export interface IBlogRepository {
  getBlogs: (
    limit: number,
    page: number,
    search?: string,
    categoryId?: string,
    most_viewed?: boolean
  ) => Promise<{
    blogs: Blog[] | null;
    pagination: {
      total: number;
      hasPrevious: boolean;
      hasMore: boolean;
      currentPage: number;
      limit: number;
      pages: number;
    };
  } | null>;
  updateViews: (id: string) => Promise<number | null>;
  getBlog: (id: string) => Promise<Blog | null>;
  delete(id: string): Promise<boolean | null>;
  create(blog: CreateBlogDto): Promise<Blog | null>;
  getBlogById(id: string): Promise<Blog | null>;
  update(blogId: string, blog: UpdateBlogDto): Promise<Blog | null>;
}
