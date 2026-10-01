import { Router } from "express";
import { PublishedPostsStats } from "../events/published-posts.stats.js";

const router = Router();
router.get("/stats", (req, res) => res.status(200).json({ totalPublishedPosts: PublishedPostsStats.getTotal() }));
export default router;
