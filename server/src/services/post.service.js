import { PostRepository } from "../repositories/post.repository.js";
import { assertNonEmpty } from "../utils/validation.js";
import { EventBus } from "../events/event-bus.js";
import { SubstringSearchStrategy } from "./search/substring-search.strategy.js";

const searchStrategy = SubstringSearchStrategy;

function normalizeTagNames(tagNames) {
  if (!Array.isArray(tagNames)) return [];
  return [...new Set(tagNames.map((tag) => String(tag).trim().toLowerCase()).filter(Boolean))];
}

export const PostService = {
  async publish({ authorId, title, body, tagNames = [] }) {
    assertNonEmpty(title, "title", "MISSING_TITLE");
    assertNonEmpty(body, "body", "MISSING_BODY");

    const normalizedTagNames = normalizeTagNames(tagNames);
    const post = await PostRepository.createWithTags({
      authorId,
      title,
      body,
      tagNames: normalizedTagNames,
      status: "PUBLISHED",
      publishedAt: new Date(),
    });
    EventBus.emit("post.published", { postId: post.id, authorId, title: post.title, tags: normalizedTagNames });
    return post;
  },

  async listPublished({ page = 1, pageSize = 10 }) {
    const { posts, hasMore } =
      await PostRepository.findPublished({ page, pageSize });

    return { posts, page, hasMore };
  },

  async search({ query, page = 1, pageSize = 10 }) {
    return searchStrategy.search(query, { page, pageSize });
  },
};
