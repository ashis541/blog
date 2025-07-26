import { NextResponse } from 'next/server';
import { generateRSSFeed } from '../lib/generete-rss';
import { getAllPosts, } from '../lib/posts'; // your custom function to fetch posts

export async function GET() {
  const posts = await getAllPosts(); // must return array with slug, title, excerpt, date, content, image, tags, etc.
  const rss = await generateRSSFeed(posts);

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
}
