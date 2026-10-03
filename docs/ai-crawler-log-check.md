# Weekly AI crawler check (Netlify logs)

Why: the first appearance of GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User or Google-Extended in the access logs is the earliest signal that AI referral has started. It shows up weeks before anything in Search Console.

Netlify only retains request logs on paid log drains, so there are two ways to run this.

## Option A — Netlify Log Drains (paid, automatic)

1. Netlify dashboard → Site → Logs → Log Drains → add a drain to a destination you already have (Datadog, Axiom, or an S3 bucket). Axiom's free tier is enough for this site's traffic.
2. In the destination, save this query and schedule it weekly with an email digest:

   user_agent matches /GPTBot|ClaudeBot|PerplexityBot|ChatGPT-User|Google-Extended|anthropic-ai|Claude-Web/i

3. Group by user agent and by path. Paths under /quality-of-life are the ones that matter for Pillar 4.

## Option B — Manual (free)

Netlify's free plan doesn't expose access logs. Use the Netlify Analytics tab (paid add-on) or, without it, rely on the monthly LLM probe in docs/llm-tracking.md and on GSC's "Discover" and "Search" referrers.

If a free path is needed, add a tiny edge function later that logs the user agent for the first 100 crawler hits per day to a KV store. Not built yet; decision deferred until the cluster is fully shipped.

## Log the first sighting

When any of these agents first appears, add a line to docs/deploy-log.md with the date, the agent, and the path. That date is the start of the 12-week kill-trigger clock for AI referral, separate from the GSC clock.
