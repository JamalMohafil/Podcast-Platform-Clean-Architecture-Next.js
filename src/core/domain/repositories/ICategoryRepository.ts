import { CreateCategoryDto } from "../../dtos/category/createCategoryDto";
import { Category } from "../entities/Category";

export interface ICategoryRepository {
  create(data: CreateCategoryDto): Promise<Category | null>;
  findCategories(
    limit?: number,
    page?: number,
    search?: string,
    isAdmin?:boolean,
  ): Promise<{
    categories: Category[] | null;
    pagination: {
      total: number;
      hasPrevious: boolean;
      hasMore: boolean;
      currentPage: number;
      limit: number;
      pages: number;
    };
  } | null>;
  delete(categoryId: string): Promise<boolean>;
  findByName(name: string): Promise<Category | null>;
  update(categoryId: string, category: any): Promise<Category | null>;
  findById(categoryId: string): Promise<Category | null>;
}
