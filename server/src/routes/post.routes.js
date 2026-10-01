import { Router } from "express";
import { PostService } from "../services/post.service.js";

const router = Router();

router.post("/posts", async (req, res) => {
  try {
    const { authorId, title, body, tagNames } = req.body;

    const post = await PostService.publish({
      authorId,
      title,
      body,
      tagNames,
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({
      error: {
        code: err.code || "VALIDATION_ERROR",
        message: err.message,
      },
    });
  }
});

router.get("/posts", async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
    const result = search ? await PostService.search({ query: search, page }) : await PostService.listPublished({ page });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
