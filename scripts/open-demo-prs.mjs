// Pushes main and the six scenario branches, then opens one PR per scenario so the DS Guard bot comments.
// Usage (after `gh repo create` and `git remote add origin ...`): node scripts/open-demo-prs.mjs
// Idempotent: an existing PR for a branch is left as is.
import { execFileSync } from 'node:child_process'

const sh = (cmd, args) => execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim()
const scenarios = [
  ['demo/agent-appointment-reminder', 'main'],
  ['demo/declared-exception', 'main'],
  ['demo/a11y-regression', 'main'],
  ['demo/ds-upgrade-2.0', 'main'],
  ['demo/ds-upgrade-2.0-fixes', 'demo/ds-upgrade-2.0'],
  ['demo/cleanup-prescriptions', 'main'],
]

sh('git', ['push', '-u', 'origin', 'main', ...scenarios.map(([b]) => b)])
for (const [branch, base] of scenarios) {
  if (sh('gh', ['pr', 'list', '--head', branch, '--state', 'all', '--json', 'number', '--jq', 'length']) !== '0') {
    console.log(`${branch}: PR already exists`)
    continue
  }
  const title = sh('git', ['log', '-1', '--format=%s', branch])
  const body = `Demo scenario \`${branch}\`. Expected result: see the table in the README.\n\nThe DS Guard comment appears below once the workflow has run.`
  console.log(sh('gh', ['pr', 'create', '--head', branch, '--base', base, '--title', title, '--body', body]))
}
