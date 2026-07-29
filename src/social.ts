/**
 * Social media content generator — uses LLM to produce platform-specific
 * articles from daily digests.
 *
 * Usage:
 *   pnpm xiaohongshu          # latest day → xiaohongshu
 *
 * Reads API keys from .env (local only).
 */

import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { callLlm } from "./report.ts";

const DIGESTS_DIR = "digests";
const SOCIAL_DIR = "social";

function saveSocialFile(content: string, filename: string): string {
  fs.mkdirSync(SOCIAL_DIR, { recursive: true });
  const filepath = path.join(SOCIAL_DIR, filename);
  fs.writeFileSync(filepath, content, "utf-8");
  return filepath;
}

// Reports to include as source material (zh only)
const SOURCE_REPORTS = ["ai-cli", "ai-agents", "ai-web", "ai-trending", "ai-hn"];

function getRecentDates(n: number): string[] {
  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  return fs
    .readdirSync(DIGESTS_DIR)
    .filter((d) => dateRe.test(d) && fs.statSync(path.join(DIGESTS_DIR, d)).isDirectory())
    .sort()
    .reverse()
    .slice(0, n);
}

const TRUNCATE_PER_REPORT = 3000;

function loadReports(date: string): string {
  const sections: string[] = [];
  for (const report of SOURCE_REPORTS) {
    const filePath = path.join(DIGESTS_DIR, date, `${report}.md`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      sections.push(`## [${report}]\n\n${content.slice(0, TRUNCATE_PER_REPORT)}`);
    }
  }
  return sections.join("\n\n---\n\n");
}

function buildXiaohongshuPrompt(reports: string, date: string): string {
  return `你是一位 AI 技术领域的内容创作者，风格平实专业，擅长简洁地传达技术动态。

以下是 ${date} 的 AI 生态日报原始内容：

${reports}

---

请基于以上内容，生成一篇小红书日报笔记，要求：

**标题**：简洁明了，15-25 字，概括当日核心动态

**正文**（500-800 字）：
1. 一句话概括今天 AI 领域的整体动态
2. 精选 5-8 个当日要点，每个要点：
   - 用简短的小标题（可适当用 emoji 区分类别）
   - 1-2 句话说清楚事实和意义
   - 语言简练，不夸大
3. 结尾一句话总结
4. 最后加 3-5 个话题标签（#AI #开源 等）

**风格要求**：
- 语气平实，像写技术简报，不要夸张或煽情
- 段落短小，适合手机阅读
- 技术术语保留原文，不需要刻意通俗化
- 陈述事实为主，少用感叹号和夸张形容词
- 不要加任何链接（小红书不支持外链）

直接输出标题和正文，不要加额外说明。`;
}

async function generateXiaohongshu(): Promise<void> {
  const dates = getRecentDates(1);
  if (dates.length === 0) throw new Error("No digest directories found");
  const date = dates[0]!;
  const reports = loadReports(date);
  if (!reports) throw new Error(`No reports found for ${date}`);

  console.log(`[social] Generating xiaohongshu article for ${date}…`);
  const content = await callLlm(buildXiaohongshuPrompt(reports, date), 4096);
  const filepath = saveSocialFile(content, `${date}-xiaohongshu.md`);
  console.log(`[social] Saved to ${filepath}`);
}

if (process.argv[2] !== "xiaohongshu") {
  console.error("Usage: tsx src/social.ts xiaohongshu");
  process.exit(1);
}

generateXiaohongshu().catch((e: unknown) => {
  console.error("[social]", e instanceof Error ? e.message : e);
  process.exit(1);
});
