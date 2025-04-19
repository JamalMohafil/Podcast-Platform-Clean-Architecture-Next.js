import { Podcast } from "./Podcast";
import { User } from "./User";

export class Favorite {
  constructor(
    public id: string,
    public user_id: string,
    public podcast_id: string,
    public User?: User,
    public Podcast?: Podcast,
    public created_at?: Date,
    public updated_at?: Date
  ) {}
}
