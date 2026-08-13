/**
 * GitHub Copilot provider — OpenAI-compatible endpoint via GitHub Copilot API.
 *
 * Env vars:
 *   GITHUB_TOKEN           - GitHub token (PAT or GitHub Actions `GITHUB_TOKEN`)
 *   GITHUB_COPILOT_MODEL   - model name (default: gpt-4.1)
 *
 * Note: GitHub Models (models.github.ai) retired 2026-07-30; free tier of the
 * Copilot API only exposes gpt-4o/gpt-4.1/gpt-4o-mini.
 */

import { OpenAICompatibleProvider } from "./openai-compatible.ts";

const GITHUB_COPILOT_BASE_URL = "https://api.githubcopilot.com";

export class GitHubCopilotProvider extends OpenAICompatibleProvider {
  readonly name = "github-copilot";

  constructor(opts?: { apiKey?: string; model?: string }) {
    super({
      apiKey: opts?.apiKey ?? process.env["GITHUB_TOKEN"],
      baseURL: GITHUB_COPILOT_BASE_URL,
      model: opts?.model ?? process.env["GITHUB_COPILOT_MODEL"] ?? "gpt-4.1",
    });
  }
}
