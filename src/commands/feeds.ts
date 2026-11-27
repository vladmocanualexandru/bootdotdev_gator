import { readConfig } from "../config";
import { createFeedfollow } from "../lib/db/queries/feedFollows";
import { createFeed, getAllFeeds, getAllFeedsForUserId, getFeedByUrl, getFeedByNameOrUrl } from "../lib/db/queries/feeds";
import { getUserById, getUserByName} from "../lib/db/queries/users";

export async function handlerAddFeed(cmdName: string, ...args: string[]) {
  if (!args || args.length <2) {
    throw new Error("Register requires two parameters: feed name and feed URL.");
  }

  let feed = await getFeedByUrl(args[1]);

  if (!feed) {
    feed = await createFeed(args[0],args[1]);
    console.log("Feed added with name:", args[0], "and URL:", args[1]);
  }
  
  const config = readConfig();
  
  if (!config.currentUserName) {
    throw new Error("No current user is set in the configuration.");
  } else {
    const userInfo = await getUserByName(config.currentUserName);
    
    await createFeedfollow(userInfo.id, feed.id);
    
    console.log("Feed ", args[0], " followed.");
  }
}

export async function handlerFollowing(cmdName: string, ...args: string[]) {
  const config = readConfig();
  if (!config.currentUserName) {
    throw new Error("No current user is set in the configuration.");
  } else {
    const userInfo = await getUserByName(config.currentUserName);

    const followingFeeds = await getAllFeedsForUserId(userInfo.id);

    for (let feed of followingFeeds) {
      console.log("Feed name:", feed.feeds.name);
    }
  }
}

export async function handlerFollow(cmdName: string, ...args: string[]) {
  if (!args || args.length <1) {
    throw new Error("Register requires one parameter: feed name or url.");
  }

  let feed = await getFeedByNameOrUrl(args[0]);

  if (!feed) {
    throw new Error("Unknown feed name. Add it first using the addfeed command.");
  }
  
  const config = readConfig();
  
  if (!config.currentUserName) {
    throw new Error("No current user is set in the configuration.");
  } else {
    const userInfo = await getUserByName(config.currentUserName);
    
    await createFeedfollow(userInfo.id, feed.id);
    
    console.log("Feed ", args[0], " followed.");
  }
}

export async function handlerFeeds(cmdName: string, ...args: string[]) {
  const allFeeds = await getAllFeeds();

  for (let feed of allFeeds) {
    console.log(feed.name);
  }

}