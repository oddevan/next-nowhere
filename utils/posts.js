import matter from "gray-matter";
import fs from "fs";

export function getTumblrBaseUrl() {
  const blogAddress = 'plotholefragments.tumblr.com'
  const apiKey = 'OAUTH_CONSUMER_KEY'
  return `https://api.tumblr.com/v2/blog/${blogAddress}/posts?api_key=${apiKey}`
}

// Get day in format: Month day, Year. e.g. April 19, 2020
function getFormattedDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

export async function getSortedPosts() {
  const baseUrl = getTumblrBaseUrl();
  const posts = []
  let tumblrFetch = {}
  let pagePosts = []
  let offset = 0

  do {
      tumblrFetch = await fetch(`${baseUrl}&offset=${offset}`).then(response => response.json())
      pagePosts = tumblrFetch.response.posts
      pagePosts.forEach(element => {
          posts.push({
              slug: element.id_string,
              date: getFormattedDate(element.date),
              excerpt: element.summary,
              content: element.body,
              tags: element.tags,
              title: element.title ?? getFormattedDate(element.date)
          });
      });
      offset += 20
  } while(pagePosts.length)

  return posts;
}

export async function getPostsSlugs() {
  const posts = await getSortedPosts();

  const paths = posts.map(({ slug }) => ({
    params: { slug },
  }));

  return paths;
}

export async function getPostBySlug(slug) {
  const posts = await getSortedPosts();

  const postIndex = posts.findIndex(({ slug: postSlug }) => postSlug === slug);

  const post = posts[postIndex];
  const previousPost = posts[postIndex + 1];
  const nextPost = posts[postIndex - 1];

  return { post, previousPost, nextPost };
}
