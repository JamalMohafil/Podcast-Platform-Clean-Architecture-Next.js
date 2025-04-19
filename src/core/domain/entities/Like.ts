import { User } from "./User";

export class Like {
  constructor(
    public id: string,
    public user_id: string,
    public comment_id: string,
    public user?: Partial<User>,

    public created_at?: Date,
    public updated_at?: Date
  ) {}
}
