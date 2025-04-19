import { Blog } from "./Blog";
import { User } from "./User";

export class Comment {
  constructor(
    public id: string,
    public comment: string,
    
    public user_id: string,
    public blog_id: string,
    public created_at?: Date,
    public updated_at?: Date
  ) {}
}
