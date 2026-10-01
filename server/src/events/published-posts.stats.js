let totalPublishedPosts = 0;

export const PublishedPostsStats = {
  increment() { totalPublishedPosts += 1; },
  getTotal() { return totalPublishedPosts; },
};
