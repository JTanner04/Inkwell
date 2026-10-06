# Review: Tagging, Strategy Search, Observer Publish Event

**Reviewed increment:** Lecture 9 tagging, pluggable search (Strategy), and publish events (Observer)  
**Reviewer prep time:** ~15 minutes  
**Defects found:** 1 (Node version compatibility note)  
**Outcome:** Accept with minor follow-up

## Checklist review

- Architecture: Route/service/repository responsibilities remain separated, and Prisma access stays in the repository layer.
- Design quality: Search behavior is isolated behind the Strategy implementation, and publish notifications use the EventBus Observer pattern.
- UX/accessibility: No new interactive UI behavior in this reviewed server-side increment required an accessibility change.
- Process hygiene: No secrets or environment values were introduced by the reviewed increment.

## Finding

`EventBus.on()` uses the `??=` operator. To make the runtime requirement explicit for contributors and avoid Node.js compatibility confusion, the project should declare its minimum supported Node.js version.

## Follow-up

Add the following engine constraint to `server/package.json`:

```json
"engines": {
  "node": ">=22.0.0"
}
```

This is a small compatibility/documentation follow-up and does not block acceptance of the Lecture 9 increment.
