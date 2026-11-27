import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string) : Promise<RSSFeed> {
    const response = await fetch(feedURL, {
        headers: {
            'User-Agent': 'gator'
        }
    });

    const text = await response.text();

    const parser = new XMLParser({ processEntities: false });
    
    let jObj = parser.parse(text);

    return jObj.rss as RSSFeed;
}