# SDD ledger — plan: docs/superpowers/plans/2026-11-22-movieflix-expanded-catalog.md

Setup: Ruling: Git isolation and task commits are unavailable until the approved Git initialization step, because the supplied workspace is not yet a repository — work in place and retain the plan/spec/ledger as the audit trail — cost if wrong: pre-initialization changes cannot be separated through Git history.
Setup: Ruling: Parallel agents own disjoint backend, frontend, and deployment-preparation files; the root agent owns integration, Git initialization, publishing, deployment, and final verification — cost if wrong: shared global files may require manual reconciliation.
Pre-flight: Task 1 produces `Movie.type` and seeded documents consumed by Task 2 helpers and UI.
Pre-flight: Task 2 preserves missing-type fallback so older API records remain compatible.
Pre-flight: Task 3 consumes completed server and client work and may reseed only after reference cleanup is verified.

Task 1: in progress (backend catalog agent; RED tests required before implementation).
Task 2: in progress (frontend catalog agent; RED tests required before implementation).
Task 3: pending integration and full verification.
Deployment: in progress (production configuration agent); Render + MongoDB Atlas guide requested by user.
External access: GitHub CLI credentials are expired; Render and MongoDB Atlas connections have been offered while code work continues.
