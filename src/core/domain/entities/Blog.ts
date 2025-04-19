import { Category } from "./Category";
import { User } from "./User";

export class Blog {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public slug: string,
    public updatedAt: Date,
    public created_at: Date,
    public user_id: string,
    public category_id?: string,
    public category?: Category,
    public user?: User,
    public views_count?: number,
    public commentsCount?: number,
    public imageUrl?: string
  ) {}
}
