import { Router } from "express";
import { PostService } from "../services/post.service.js"; import { requireAuth } from "../middleware/auth.middleware.js";
const router = Router();
router.post("/posts", requireAuth, async (req, res, next) => { try { const { title, body, tagNames } = req.body; const post = await PostService.publish({ authorId: req.user.id, title, body, tagNames }); res.status(201).json(post); } catch (err) { next(err); } });
router.delete("/posts/:id", requireAuth, async (req, res, next) => { try { const post = await PostService.getById(req.params.id); if (!post) return res.status(404).json({ error: { code: "NOT_FOUND" } }); if (post.authorId !== req.user.id) return res.status(403).json({ error: { code: "FORBIDDEN" } }); await PostService.delete(req.params.id); return res.status(204).end(); } catch (err) { return next(err); } });
router.get("/posts", async (req, res, next) => { try { const page = Number(req.query.page) || 1; const search = typeof req.query.search === "string" ? req.query.search.trim() : ""; const result = search ? await PostService.search({ query: search, page }) : await PostService.listPublished({ page }); res.status(200).json(result); } catch (err) { next(err); } });
export default router;
