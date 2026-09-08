# Inkwell API Contract — v1

## POST /api/auth/register

Request:

```json
{
  "email": "string",
  "displayName": "string",
  "password": "string"
}

## POST /api/posts/:id/comments

Request: { body: string }

Success: 201 { comment: CommentPublic }

Errors:
- 400 INVALID_COMMENT — "Comment body cannot be empty."
- 401 UNAUTHORIZED — "Authentication is required."
- 404 POST_NOT_FOUND — "Post not found."