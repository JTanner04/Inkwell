# Software Configuration Management Policy

## Branching Strategy

Inkwell uses GitHub Flow:

- `main` is always deployable.
- All work happens on short-lived branches named `<type>/<short-description>`, such as `feature/tag-search` or `fix/author-id-spoofing`.
- Contributors merge branches through pull requests that require:
  - All automated tests to pass.
  - At least one reviewer to approve the change.
- Contributors delete branches after merging them.

GitHub Flow fits Inkwell's one-lecture, one-increment pace. It keeps the process lightweight while protecting `main` and supporting continuous integration.

## Commit Message Conventions

Inkwell follows Conventional Commits:

```
<type>(<scope>): <short summary>
```

Allowed types include `feat`, `fix`, `test`, `docs`, `refactor`, `chore`, and `security`.

Examples:

```
feat(posts): add tag-based search
security(auth): fix authorId spoofing vulnerability
```

This convention makes project history searchable. For example, `git log --grep="^security"` identifies security-related changes and provides an audit trail.
