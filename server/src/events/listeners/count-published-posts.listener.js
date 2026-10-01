import { EventBus } from "../event-bus.js";
import { PublishedPostsStats } from "../published-posts.stats.js";

EventBus.on("post.published", () => PublishedPostsStats.increment());
