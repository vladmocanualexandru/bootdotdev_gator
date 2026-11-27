import { fetchFeed } from "../rss";

export async function handlerAgg(cmdName: string, ...args: string[]) {
  let feedUrl = "https://www.wagslane.dev/index.xml";
  if (args && args.length > 0) {
    feedUrl = args[0];
  }
  const result = await fetchFeed(feedUrl);

  if (!result || !result.channel) {
    throw new Error("Agg failed to fetch feed.");
  } 

  console.log(JSON.stringify(result));
}