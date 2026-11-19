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

## CI Enforcement (Lecture 20)

`main` is a protected branch:

- Required status checks: `dependency-audit`, `server-tests`, `client-tests`, `e2e-tests`, and `docker-build`.
- No direct pushes to `main`; all changes go through pull requests.
- Branches must be up to date with `main` before merging.
- The rule applies to administrators too.

This turns the policy that `main` is always deployable into a mechanically enforced guarantee: a pull request cannot merge until every required check passes.
