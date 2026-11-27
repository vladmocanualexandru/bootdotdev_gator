import { db } from "..";
import { feedFollows, feeds } from "../schema";
import { or, eq } from "drizzle-orm";

export async function createFeed(name: string, url:string) {
  const [result] = await db.insert(feeds).values({ name: name, url: url }).returning();

  return result;
}

export async function getFeedByUrl(url: string) {
    const [result] = await db.select().from(feeds).where(eq(feeds.url, url));
    return result;
}

export async function getFeedByNameOrUrl(nameOrUrl: string) {
    const [result] = await db.select().from(feeds).where(or(eq(feeds.name, nameOrUrl), eq(feeds.url, nameOrUrl)));
    return result;
}

export async function getAllFeeds() {
  return await db.select().from(feeds);
}

export async function getAllFeedsForUserId(userId: string) {
  const feedsForUser =  await db.select().from(feedFollows).where(eq(feedFollows.user_id, userId)).innerJoin(feeds, eq(feedFollows.feed_id, feeds.id));

  return feedsForUser;
}
