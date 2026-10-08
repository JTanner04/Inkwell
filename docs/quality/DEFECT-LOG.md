# Inkwell Defect Log

| ID | Found During | Cause Category | Description | Remediation |
|----|--------------|----------------|-------------|-------------|
| D-001 | Lecture 10 review | Compatibility | Nullish-coalescing assignment used without a documented minimum Node.js version. | Added an `engines` field to `server/package.json` requiring Node.js 22 or newer. |
