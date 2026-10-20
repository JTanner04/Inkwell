import { beforeEach, describe, expect, jest, test } from "@jest/globals";

const mockPostRepository = { createWithTags: jest.fn() };
const mockEventBus = { emit: jest.fn() };
const mockSearchStrategy = { search: jest.fn() };

jest.unstable_mockModule("../../repositories/post.repository.js", () => ({
  PostRepository: mockPostRepository,
}));
jest.unstable_mockModule("../../events/event-bus.js", () => ({
  EventBus: mockEventBus,
}));
jest.unstable_mockModule("../search/substring-search.strategy.js", () => ({
  SubstringSearchStrategy: mockSearchStrategy,
}));

const { PostService } = await import("../post.service.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PostService.publish", () => {
  test("creates a PUBLISHED post and emits post.published", async () => {
    mockPostRepository.createWithTags.mockResolvedValue({ id: "p1", title: "Hello", status: "PUBLISHED" });

    const post = await PostService.publish({
      authorId: "u1",
      title: "Hello",
      body: "World",
      tagNames: ["Testing", "testing", "  Jest  "],
    });

    expect(post.status).toBe("PUBLISHED");
    expect(mockPostRepository.createWithTags).toHaveBeenCalledWith(expect.objectContaining({
      authorId: "u1",
      title: "Hello",
      body: "World",
      tagNames: ["testing", "jest"],
      status: "PUBLISHED",
    }));
    expect(mockEventBus.emit).toHaveBeenCalledWith(
      "post.published",
      expect.objectContaining({ postId: "p1", authorId: "u1", title: "Hello", tags: ["testing", "jest"] })
    );
  });

  test("rejects an empty title", async () => {
    await expect(PostService.publish({ authorId: "u1", title: "", body: "World" })).rejects.toThrow();
  });
});

describe("PostService.search", () => {
  test("uses default pagination when searching", async () => {
    const expected = { posts: [{ id: "p1" }], hasMore: false };
    mockSearchStrategy.search.mockResolvedValue(expected);

    await expect(PostService.search({ query: "jest" })).resolves.toEqual(expected);
    expect(mockSearchStrategy.search).toHaveBeenCalledWith("jest", { page: 1, pageSize: 10 });
  });

  test("forwards custom pagination to the configured search strategy", async () => {
    mockSearchStrategy.search.mockResolvedValue({ posts: [], hasMore: true });

    await PostService.search({ query: "testing", page: 3, pageSize: 5 });

    expect(mockSearchStrategy.search).toHaveBeenCalledWith("testing", { page: 3, pageSize: 5 });
  });

  test("returns an empty result set from the search strategy", async () => {
    const expected = { posts: [], hasMore: false };
    mockSearchStrategy.search.mockResolvedValue(expected);

    await expect(PostService.search({ query: "no-match" })).resolves.toEqual(expected);
  });

  test("propagates a search strategy failure", async () => {
    mockSearchStrategy.search.mockRejectedValue(new Error("search unavailable"));

    await expect(PostService.search({ query: "jest" })).rejects.toThrow("search unavailable");
  });
});
