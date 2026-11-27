import { db } from "..";
import { feedFollows} from "../schema";

export async function createFeedfollow(userId: string, feedId:string) {
  const [result] = await db.insert(feedFollows).values({ user_id: userId, feed_id: feedId }).returning();

  return result;
}