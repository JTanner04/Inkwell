import { prisma } from "../db/client.js";

export const PostRepository = {
  createWithTags({ authorId, title, body, tagNames, status, publishedAt }) {
    return prisma.post.create({
      data: {
        authorId, title, body, status, publishedAt,
        tags: { create: tagNames.map((name) => ({ tag: { connectOrCreate: { where: { name }, create: { name } } } })) },
      },
      include: { tags: { include: { tag: true } } },
    });
  },

  async findPublished({ page, pageSize }) {
    const rows = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize + 1,
      include: { author: { select: { id: true, displayName: true } }, tags: { include: { tag: true } } },
    });

    const hasMore = rows.length > pageSize;

    return {
      posts: rows.slice(0, pageSize),
      hasMore,
    };
  },

  async searchPublished({ query, page, pageSize }) {
    const rows = await prisma.post.findMany({
      where: { status: "PUBLISHED", OR: [
        { title: { contains: query, mode: "insensitive" } },
        { body: { contains: query, mode: "insensitive" } },
        { tags: { some: { tag: { name: { contains: query, mode: "insensitive" } } } } },
      ] },
      orderBy: { publishedAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize + 1,
      include: { author: { select: { id: true, displayName: true } }, tags: { include: { tag: true } } },
    });
    const hasMore = rows.length > pageSize;
    return { posts: rows.slice(0, pageSize), hasMore };
  },
};
