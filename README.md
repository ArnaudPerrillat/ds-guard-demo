# Orvella patient portal — DS Guard demo

A **fictional** patient portal (appointments, prescriptions, messages, billing) and its small design system, used to show [DS Guard](https://github.com/ArnaudPerrillat/ds-guard) on real pull requests. No real data, no real company, practitioner or place: every name here is a placeholder.

## What is in the repository

| Path | What |
| --- | --- |
| `design-system/ui` | `@orvella/ui`: 12 React components. Version 1.4 marks three APIs `@deprecated` (`Box`, `Button.destructive`, `Badge.variant`). |
| `design-system/tokens` | `@orvella/tokens`: DTCG tokens (colour, spacing, radius, font size) and the generated CSS custom properties. |
| `vendor/` | The design system packed as versioned tarballs (`npm run ds:pack`). The app installs them, so `package-lock.json` pins an exact DS version, as it would with a registry. |
| `src/` | The portal (Vite + React + TypeScript). Deliberately imperfect: some hard-coded values, a deprecated token, a legacy billing screen. |
| `ds-guard.config.json`, `ds-exceptions.yml` | DS Guard configuration and the intentional-exceptions registry. |
| `.github/workflows/ds-guard.yml` | Comments every pull request. Non-blocking, except accessibility. |
| `.github/workflows/leadership-report.yml` | Weekly: records the numbers and publishes the one-page leadership report on GitHub Pages. |

## The pull requests

Each scenario is a branch, opened as a pull request and left open so the bot's comment stays visible.

| Branch | Scenario | What the comment shows |
| --- | --- | --- |
| `demo/agent-appointment-reminder` | Feature written by a coding agent: an appointment reminder. | Hard-coded colours and spacing with the matching token, a native `<button>` where the DS has `Button`, a deprecated prop, a prop value outside the allowed set. |
| `demo/declared-exception` | An off-scale welcome banner, approved in design review. The PR declares `EXC-002` (owner, expiry) and annotates the line. | The finding is listed as **covered** by an exception, not as drift. |
| `demo/a11y-regression` | An image without `alt`, an icon button without a name. | Blocking accessibility findings: the only scenario where the check fails. |
| `demo/ds-upgrade-2.0` | `@orvella/ui` and `@orvella/tokens` 1.4 → 2.0 (lockfile change only). 2.0 removes `Box` and the `color.brand.legacy` token, renames `Stack` gaps and deprecates `Text.size`. | The contract follows the lockfile: conformance drops from 99% to 70%. The PR changes no source line, so the per-line list is empty; run `ds-guard scan` on the branch to see the 21 new findings. |
| `demo/ds-upgrade-2.0-fixes` | Follow-up to the upgrade (based on it). | The code moves to the 2.0 API; conformance recovers. |
| `demo/cleanup-prescriptions` | Replaces the hard-coded values of the prescriptions screen with tokens. | Explained coverage goes up. |

On `main`, the exception `EXC-001` (legacy billing) **expired** on 2026-10-31: it no longer covers the billing screen, whose findings count again, and DS Guard says so in every PR comment until the exception is renewed or the code fixed.

Expected results, checked locally with the CLI in PR mode (`--base main`; the fixes branch against the upgrade branch):

| Branch | Explained coverage | Conformance | Findings on changed lines |
| --- | --- | --- | --- |
| `main` (whole codebase) | 80% | 99% | 19 warnings, 1 info |
| `demo/agent-appointment-reminder` | 73% | 96% | 11 warnings (colour, spacing, radius, deprecated prop, invalid value), 1 info (native `<button>`) |
| `demo/declared-exception` | 81% | 99% | none; 2 covered by `EXC-002` |
| `demo/a11y-regression` | 79% | 99% | 2 blocking errors (`a11y-img-alt`, `a11y-accessible-name`): the check fails |
| `demo/ds-upgrade-2.0` | 80% | 70% | none on changed lines |
| `demo/ds-upgrade-2.0-fixes` | 80% | 100% | none |
| `demo/cleanup-prescriptions` | 90% | 99% | none |

Every branch also lists the expired `EXC-001`.

## Run it locally

Requirements: Node 22+.

```bash
npm ci
npm run dev                 # the portal
npx ds-guard scan           # once @ds-guard/cli is published
```

Until the CLI is on npm, build it from the DS Guard repository (`pnpm build`, then `pnpm pack` in `packages/cli`) and run `npx --package /path/to/ds-guard-cli-0.1.0.tgz ds-guard scan`. On a scenario branch, add `--base main` to see only the findings on the lines the PR changes, as the bot does.
